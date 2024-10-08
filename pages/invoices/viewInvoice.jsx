
import jsPDF from 'jspdf';
import React, { useEffect, useState, useCallback,useRef } from "react";
import { ORDER_END_POINT } from "@/constants/api_endpoints/orderEndPoints";
import { useParams } from 'react-router-dom';
import { useRouter } from "next/router";
const ViewInvoice = () => {
    const invoiceRef = useRef();

    const generatePDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.html(invoiceRef.current, {
            callback: function (pdf) {
                pdf.save('invoice.pdf');
            },
            x: 10,
            y: 10
        });
    };
    const router = useRouter();
    const { data } = router.query; // Access the query parameter
   
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    console.log(invoiceDetails);





    
    useEffect(() => {
        if (data) {
            try {
                const parsedData = JSON.parse(data); // Deserialize the JSON string
                setInvoiceDetails(parsedData);
              
            
            } catch (error) {
                console.error('Failed to parse invoice data:', error);
            }
        }
    }, [data])

    if (!invoiceDetails) return <div>Loading...</div>;
    const {
        order_customer: customer,
        order_variants: variants,
        invoice_no,
        delivery_date,
        total_amount,
        payment_method,
        shipping_charge,
    } = invoiceDetails;

    return (
        <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-2 md:p-6 xl:p-7.5 flex flex-col" ref={invoiceRef}>
                    <div className="card-body print:hidden">
                        <div className="flex flex-col gap-5 md:items-center md:flex-row">
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={generatePDF}
                                    className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Download Invoice as PDF
                                </button>
                                {/* More action buttons can go here */}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded shadow-sm my-6" id="invoice">
                        <div className="grid grid-cols-2 items-center">
                            {/* <div>
                                <img
                                    src={invoiceDetails.companyLogo}
                                    alt="company-logo"
                                    height="100"
                                    width="100"
                                />
                            </div> */}
                            {/* <div className="text-right">
                                <p>{invoiceDetails.companyName}</p>
                                <p className="text-gray-500 text-sm">{invoiceDetails.companyEmail}</p>
                                <p className="text-gray-500 text-sm mt-1">{invoiceDetails.companyPhone}</p>
                                <p className="text-gray-500 text-sm mt-1">VAT: {invoiceDetails.vat}</p>
                            </div> */}
                        </div>

                        {/* Client Info */}
                        <div className="grid grid-cols-2 items-center mt-8">
                            <div>
                                <p className="font-bold text-gray-800">Bill to:</p>
                                <p className="text-gray-500">{customer.name}</p>
                                <p className="text-gray-500">{customer.phone}</p>
                                <p className="text-gray-500">{customer.address_1}</p>
                            </div>
                            <div className="text-right">
                                <p>
                                    Invoice number:
                                    <span className="text-gray-500">{invoiceDetails.invoice_no}</span>
                                </p>
                                <p>
                                    Delivery date: <span className="text-gray-500">{invoiceDetails.delivery_date}</span>
                                </p>
                            </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="-mx-4 mt-8 flow-root sm:mx-0">
                            <table className="min-w-full">
                                <thead className="border-b border-gray-300 text-gray-900">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                                        <th className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Quantity</th>
                                        <th className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price</th>
                                        <th className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Discount</th>
                                        <th className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Tax</th>
                                        <th className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(variants) && variants.length > 0 ? (
                                        variants.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="max-w-0 py-5 pl-4 pr-3 text-sm">
                                                    <div className="font-medium text-gray-900">{item.product_id}</div>
                                                </td>
                                                <td className=" px-3 py-5 text-right text-sm">{item.quantity}</td>
                                                <td className=" px-3 py-5 text-right text-sm">{item.price}</td>
                                                
                                                <td className=" px-3 py-5 text-right text-sm">{item.discount}</td>
                                                <td className=" px-3 py-5 text-right text-sm">{item.tax}</td>
                                              
                                                <td className="py-5 pl-3 pr-4 text-right text-sm">{(((item.price * item.quantity)-item.discount)+item.tax)/100}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-5 text-center text-gray-500">No items available</td>
                                        </tr>
                                    )}
                                </tbody>

                                <tfoot>

                                <tr>
                                        <th scope="row" colSpan="5" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Shipping charge</th>
                                        <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">{invoiceDetails.shipping_charge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan="5" className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Total</th>
                                        <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">{invoiceDetails.total_amount}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="my-5">
                            <p className="mb-2 text-sm uppercase text-gray-500 ">
                                Payments Details
                            </p>
                            <p className="mb-1 text-gray-500 ">
                                Payment Method:{invoiceDetails.payment_method}

                            </p>

                            <p className="mb-1 text-gray-500 ">
                                Payment Method:{invoiceDetails.payment}
                                
                            </p>
                        
                            <p className="mb-0 text-gray-500 ">
                                Total Amount: <b>$755.96</b>
                            </p>
                        </div>
                        

                        <div className="flex mt-16 gap-1 px-4 py-3 text-sm border rounded-md md:items-center border-sky-200 text-sky-500 bg-secondary dark:bg-sky-400/20 dark:border-sky-500/50">
                            <p>
                                <span className="font-bold">NOTES:{invoiceDetails.notes}</span> 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ViewInvoice;
