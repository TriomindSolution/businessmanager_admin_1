import ToastMessage from "@/components/Toast";
import { ORDER_END_POINT } from "@/constants/api_endpoints/orderEndPoints";
import Axios from "@/utils/axios";
import React, { useCallback, useEffect, useState } from "react";

const DeleterInvoice = ({ isOpen, onClose, data, isParentRender }) => {
    const [loading, setLoading] = useState(false);
    const { http } = Axios();

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);


    const deleteData = async () => {
        try {
            const response = await http.delete(ORDER_END_POINT.delete(data?.id));
            console.log("response", response);
            
            if (response.data.status === true) {
                notify('success', response.data.message);
                if (isParentRender) {
                    isParentRender(true);
                }
                onClose();
            } else {
                notify('error', response.data.message);
            }
        } catch (error) {
            notify('error', error.message);
        }
    }
    
  return (
    <>
    <div
        style={{ marginLeft: "16.25rem" }}
        className="relative min-h-screen group-data-[sidebar-size=sm]:min-h-sm"
    >

        <div className="group-data-[sidebar-size=lg]:ltr:md:ml-vertical-menu group-data-[sidebar-size=lg]:rtl:md:mr-vertical-menu group-data-[sidebar-size=md]:ltr:ml-vertical-menu-md group-data-[sidebar-size=md]:rtl:mr-vertical-menu-md group-data-[sidebar-size=sm]:ltr:ml-vertical-menu-sm group-data-[sidebar-size=sm]:rtl:mr-vertical-menu-sm pt-[calc(theme('spacing.header')_*_1)] pb-[calc(theme('spacing.header')_*_0.8)] px-4 group-data-[navbar=bordered]:pt-[calc(theme('spacing.header')_*_1.3)] group-data-[navbar=hidden]:pt-0 group-data-[layout=horizontal]:mx-auto group-data-[layout=horizontal]:max-w-screen-2xl group-data-[layout=horizontal]:px-0 group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:ltr:md:ml-auto group-data-[layout=horizontal]:group-data-[sidebar-size=lg]:rtl:md:mr-auto group-data-[layout=horizontal]:md:pt-[calc(theme('spacing.header')_*_1.6)] group-data-[layout=horizontal]:px-3 group-data-[layout=horizontal]:group-data-[navbar=hidden]:pt-[calc(theme('spacing.header')_*_0.9)]">
            <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
                <div className="gap-2 ">
                    <div className="col-span-12 card 2xl:col-span-12">

                        {isOpen && (
                            <div
                                id="largeModal"
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-bg"
                            // onClick={() => {
                            //     onClose();
                            //     setExpense({});
                            // }}
                            >
                                <div className="fixed flex flex-col items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-md dark:bg-zink-600">
                                    <div className="w-screen md:w-[40rem] bg-white shadow rounded-md dark:bg-zink-600 flex flex-col">
                                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500">
                                            <h5 className="text-16">Seller</h5>
                                            <button
                                                onClick={() => {
                                                    onClose();
                                                }}
                                                className="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500 dark:text-zink-200 dark:hover:text-red-500"
                                            >
                                                <i data-lucide="x" className="size-5" />
                                            </button>
                                        </div>
                                        <div className="mx-auto md:max-w-lg">
                                        <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to Delete ?</p>
                      
                                        </div>

                                        <div className="flex justify-end gap-2 mt-5 p-4 mt-auto border-t border-slate-200 dark:border-zink-500">
                                            <button
                                                type="button"
                                                className="text-red-500 bg-white btn hover:text-red-500 hover:bg-red-100 focus:text-red-500 focus:bg-red-100 active:text-red-500 active:bg-red-100 dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                                                onClick={() => {
                                                    onClose();
                                                }}
                                            >
                                                <i data-lucide="x" className="inline-block size-4" />{" "}
                                                <span className="align-middle">Cancel</span>
                                            </button>
                                            <button
                                                type="submit"
                                                className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                                                onClick={deleteData}
                                            >
                                                Submit
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>


    </div>
</>
  )
}

export default DeleterCustomer