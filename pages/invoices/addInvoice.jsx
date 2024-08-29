import React from 'react';

const AddInvoice = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        General Info
                    </h4>
                </div> */}

                <div className="p-2 md:p-6 xl:p-7.5 flex flex-col ">
                <h6 className="my-5 underline text-16"> General Info:</h6>

                    {/* Invoice Number Inputs */}
                    <div className="mb-3 flex flex-col gap-5 sm:flex-row">

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Invoice No
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Delivery Date
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="date"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>


                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Payment From
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                               Payment Method
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mb-3 flex flex-col gap-5 sm:flex-row">

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-2 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Notes
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-2 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                               Payment Status

                            </label>
                            <div className="relative">
                                {/* <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                /> */}
                                <select
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    data-choices=""
                            data-choices-search-false=""
                            name="paymentStatus"
                            id="paymentStatus"
                           
                          >
                            <option value="" disabled>
                              Select Status
                            </option>
                            <option value="0">Paid</option>
                            <option value="1">Unpaid</option>
                            <option value="2">Cancel</option>
                            <option value="3">Refund</option>
                          </select>
                            </div>
                        </div>

                    </div>


                    {/* Products Info Table */}
                    <h6 className="my-5 underline text-16">Products Info:</h6>
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        Item Name
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        Quantity
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        Price
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        Discount
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        TAX
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500 w-44">
                                        Total
                                    </th>
                                    <th className="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zinc-200 dark:border-zinc-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="itemBody">
                                <tr className="item">
                                    <td className="border border-slate-200 dark:border-zinc-500">
                                        <select
                                            name="name"
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        >
                                            <option value="" disabled>
                                                Choose an Item
                                            </option>
                                            <option>Select</option>
                                        </select>
                                        {/* <div className="flex gap-2 mt-2">
                                            <input
                                                type="text"
                                                placeholder="Enter Size"
                                                className="w-1/2 p-2 border rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter Color"
                                                className="w-1/2 p-2 border rounded"
                                            />
                                        </div> */}
                                    </td>
                                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                                        <div className="flex justify-center text-center input-step">
                                            <input
                                                type="number"
                                                className="item-quantity w-full text-center p-2"
                                                min={0}
                                                max={100}
                                            />
                                        </div>
                                    </td>
                                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                                        <input
                                            type="number"
                                            className="item-price w-full p-2 text-center"
                                            placeholder="$00.00"
                                        />
                                    </td>
                                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                                        <input
                                            type="number"
                                            className="item-discount w-full p-2 text-center"
                                            placeholder="0%"
                                        />
                                    </td>
                                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                                        <input
                                            type="number"
                                            className="item-tax w-full p-2 text-center"
                                            placeholder="0%"
                                        />
                                    </td>
                                    <td className="border border-slate-200 dark:border-zinc-500">
                                        <input
                                            type="text"
                                            className="cart-total w-full p-2 text-center"
                                        />
                                    </td>
                                    <td className="border border-slate-200 dark:border-zinc-500 px-6 py-1.5">
                                        <button
                                            type="button"
                                            className="product-removal text-red-500"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td colSpan={6}>
                                        <button
                                            type="button"
                                            id="addItemButton"
                                            className="bg-white border-dashed text-custom-500 btn border-custom-500 mt-4"
                                        >
                                            Add Item
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody id="totalAmount">
                                <tr>
                                    <td colSpan={4} />
                                    <td className="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zinc-200 dark:border-zinc-500">
                                        Shipping Charge
                                    </td>
                                    <td className="font-medium border-b border-slate-200 dark:border-zinc-500">
                                        <input
                                            className="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200 cart-shipping"
                                            type="number"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4} />
                                    <td className="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zinc-200 dark:border-zinc-500">
                                        Total Amount
                                    </td>
                                    <td className="font-medium border-b border-slate-200 dark:border-zinc-500">
                                        <input
                                            type="text"
                                            id="totalAmount"
                                            className="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200 cart-total"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h6 className="my-5 underline text-16">Payments Details:</h6>
                    <div className="mb-3 flex flex-col gap-5 sm:flex-row">

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Invoice No
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/4">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor='invoice_no'
                            >
                                Invoice No
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name='invoice_no'
                                    id='invoice_no'
                                    placeholder="Enter the invoice number"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mb-3">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <div className="relative">


                            <textarea
                                className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="bio"
                                rows={3}
                                placeholder="Write your details here"

                                name="details"
                            />

                            <p
                                id="emailError"
                                className="mt-1 text-sm text-red-500"
                            />

                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-5">
                        <button
                            type="button"
                            className="h-10 w-32 text-slate-500 btn bg-gray border-slate-200 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:text-white focus:bg-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-500 active:border-blue-500 active:ring active:ring-blue-100 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-200 dark:ring-zinc-400/50"
                        >
                            <span className="align-middle">Reset</span>
                        </button>

                        <button
                            type="button"
                            className="h-10 w-32 text-black btn bg-primary border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                        >

                            <span className="align-middle">Save</span>
                        </button>
                        <button
                            type="button"
                            className="h-10 w-32 text-black bg-success border-green btn hover:text-white hover:bg-green-600 hover:border-green-600 focus:text-white focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-100 active:text-white active:bg-green-600 active:border-green-600 active:ring active:ring-green-100 dark:ring-green-400/10"
                        >
                            <i
                                data-lucide="download"
                                className="inline-block mr-1 size-4"
                            />{" "}
                            <span className="align-middle">Download</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddInvoice;
