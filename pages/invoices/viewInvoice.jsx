import React, { useRef } from 'react';
import jsPDF from 'jspdf';

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

    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="p-2 md:p-6 xl:p-7.5 flex flex-col" ref={invoiceRef}>
                        <div className="card-body print:hidden">
                            <div className="flex flex-col gap-5 md:items-center md:flex-row">
                                {/* Invoice Info */}
                                <div className="grow">
                                    <h6 className="mb-1 text-16">#TW15090257</h6>
                                    <ul className="flex items-center gap-3">
                                        <li className="text-slate-500">Create: 10 July, 2023</li>
                                        <li className="text-slate-500">Due: 10 July, 2023</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 shrink-0">
                                    {/* Download Button */}
                                    <button
                                        onClick={generatePDF}
                                        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Download Invoice as PDF
                                    </button>


                                    {/* Save & Print Button */}
                                    {/* <button
                                        onClick={() => window.print()}
                                        type="button"
                                        className="text-white  bg-secondary p-2"
                                    >
                                       
                                        <span className="align-middle">Save & Print</span>
                                    </button> */}

                                    {/* More Options Dropdown */}
                                    <div className="relative dropdown">
                                        <button
                                            className="flex items-center justify-center size-[38.39px] dropdown-toggle p-0 text-slate-500 btn bg-slate-100 hover:text-white hover:bg-slate-600 focus:text-white focus:bg-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:ring active:ring-slate-100 dark:bg-slate-500/20 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-white dark:focus:bg-slate-500 dark:focus:text-white dark:active:bg-slate-500 dark:active:text-white dark:ring-slate-400/20"
                                            id="categoryNotes1"
                                        >
                                            <i data-lucide="more-horizontal" className="size-4"></i>
                                        </button>

                                        <ul className="absolute z-50 hidden py-2 mt-1 ltr:text-left rtl:text-right list-none bg-white rounded-md shadow-md dropdown-menu min-w-[10rem] dark:bg-zink-600">
                                            <li>
                                                <a
                                                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                                    href="apps-invoice-add-new.html"
                                                >
                                                    <i data-lucide="file-edit" className="inline-block mr-1 size-3"></i>
                                                    <span className="align-middle">Edit</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    data-modal-target="deleteModal"
                                                    className="block px-4 py-1.5 text-base transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:bg-slate-100 hover:text-slate-500 focus:bg-slate-100 focus:text-slate-500 dark:text-zink-100 dark:hover:bg-zink-500 dark:hover:text-zink-200 dark:focus:bg-zink-500 dark:focus:text-zink-200"
                                                    href="#!"
                                                >
                                                    <i data-lucide="trash-2" className="inline-block mr-1 size-3"></i>
                                                    <span className="align-middle">Delete</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="p-6 bg-white rounded shadow-sm my-6" id="invoice">
                            <div className="grid grid-cols-2 items-center">
                                <div>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                                        alt="company-logo"
                                        height="100"
                                        width="100"
                                    />
                                </div>
                                <div className="text-right">
                                    <p>Tailwind Inc.</p>
                                    <p className="text-gray-500 text-sm">sales@tailwindcss.com</p>
                                    <p className="text-gray-500 text-sm mt-1">+41-442341232</p>
                                    <p className="text-gray-500 text-sm mt-1">VAT: 8657671212</p>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div className="grid grid-cols-2 items-center mt-8">
                                <div>
                                    <p className="font-bold text-gray-800">Bill to :</p>
                                    <p className="text-gray-500">
                                        Laravel LLC.
                                        <br />
                                        102, San-Francisco, CA, USA
                                    </p>
                                    <p className="text-gray-500">info@laravel.com</p>
                                </div>
                                <div className="text-right">
                                    <p>
                                        Invoice number:
                                        <span className="text-gray-500">INV-2023786123</span>
                                    </p>
                                    <p>
                                        Invoice date: <span className="text-gray-500">03/07/2023</span>
                                        <br />
                                        Due date: <span className="text-gray-500">31/07/2023</span>
                                    </p>
                                </div>
                            </div>

                            {/* Invoice Items */}
                            <div className="-mx-4 mt-8 flow-root sm:mx-0">
                                <table className="min-w-full">
                                    <colgroup>
                                        <col className="w-full sm:w-1/2" />
                                        <col className="sm:w-1/6" />
                                        <col className="sm:w-1/6" />
                                        <col className="sm:w-1/6" />
                                    </colgroup>
                                    <thead className="border-b border-gray-300 text-gray-900">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                            >
                                                Items
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                                            >
                                                Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="font-medium text-gray-900">E-commerce Platform</div>
                                                <div className="mt-1 truncate text-gray-500">
                                                    Laravel based e-commerce platform.
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                500.0
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                $100.00
                                            </td>
                                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                                $5,000.00
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="font-medium text-gray-900">E-commerce Platform</div>
                                                <div className="mt-1 truncate text-gray-500">
                                                    Laravel based e-commerce platform.
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                500.0
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                $100.00
                                            </td>
                                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                                $5,000.00
                                            </td>
                                        </tr>
                                        {/* Add other items similarly */}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th
                                                scope="row"
                                                colSpan="3"
                                                className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                            >
                                                Subtotal
                                            </th>
                                            <th
                                                scope="row"
                                                className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                                            >
                                                Subtotal
                                            </th>
                                            <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                                $10,500.00
                                            </td>
                                        </tr>
                                        {/* Add other totals similarly */}
                                    </tfoot>
                                </table>
                            </div>
                            <div className="my-5">
                                <p className="mb-2 text-sm uppercase text-gray-500 ">
                                    Payments Details
                                </p>
                                <p className="mb-1 text-gray-500 ">
                                    Payment Method: Credit Card
                                </p>
                                <p className="mb-1 text-gray-500 ">
                                    Card Holder: Paula Keenan
                                </p>
                                <p className="mb-1 text-gray-500 ">
                                    Card Number: xxxx xxxx xxxx 1402
                                </p>
                                <p className="mb-0 text-gray-500 ">
                                    Total Amount: <b>$755.96</b>
                                </p>
                            </div>
                            <div className="flex  mt-16 gap-1 px-4 py-3 text-sm border rounded-md md:items-center border-sky-200 text-sky-500 bg-secondary dark:bg-sky-400/20 dark:border-sky-500/50">
                                <p>
                                    <span className="font-bold">NOTES:</span> All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If the account is not paid within 7 days, the credit details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.
                                </p>
                            </div>


                            {/* Footer */}
                            {/* <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
                                Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default ViewInvoice;
