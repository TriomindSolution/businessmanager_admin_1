import ToastMessage from '@/components/Toast';
import withAuth from '@/components/withAuth';
import { SELLER_END_POINT } from '@/constants/api_endpoints/sellerEndPoints';
import { post, put } from '@/helpers/api_helper';
import Axios from '@/utils/axios';
import React, { useCallback, useEffect, useState } from 'react'

const SellerForm = ({ isOpen, onClose, setEditData, isParentRender }) => {
  const { http } = Axios();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seller, setSeller] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    status: "",
  });


  useEffect(() => {
    if (setEditData === null) {
      setSeller({ name: "", address: "", phone: "", email: "", description: "", status: null, });
    } else {
      setSeller({
        id: setEditData.id || "",
        name: setEditData.name || "",
        address: setEditData.address || "",
        phone: setEditData.phone || "",
        email: setEditData.email || "",
        description: setEditData.description || "",
        status: setEditData.status || "",
      });
    }
  }, [setEditData?._id, setEditData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {


      if (setEditData?.id) {
        const response = await http.put(SELLER_END_POINT.update(setEditData.id), seller);
        if (response.data.status === true) {
          notify('success', response.data.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setSeller({});
          onClose();
        } else {
          notify('error', response.data.message);
        }
      } else {
        const response = await http.post(SELLER_END_POINT.create(), seller);
        if (response.data.status === true) {
          notify('success', response.data.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setSeller({});
          onClose();
        } else {
          notify('error', response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      notify('error', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (

    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            {/* <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full"> */}
            <div className="relative bg-white p-8 rounded-lg dark:border-strokedark dark:bg-boxdark w-full max-w-xl max-h-full">

              {/* Modal content */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {setEditData?._id ? "Update Seller information" : "Create New Seller"}
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    setSeller({});
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      placeholder="Type Seller Name"
                      required=""
                      defaultValue={seller?.name}
                      onChange={handleChange}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1"> {error} </p>
                    )}
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="name"
                      className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      placeholder="Type Seller Address"
                      required=""
                      defaultValue={seller?.address}
                      onChange={handleChange}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1"> {error} </p>
                    )}

                  </div>


                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="name"
                      className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      placeholder="Type Seller Phone"
                      required=""
                      defaultValue={seller?.phone}
                      onChange={handleChange}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1"> {error} </p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="name"
                      className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      placeholder="Type Seller Email"
                      required=""
                      defaultValue={seller?.email}
                      onChange={handleChange}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1"> {error} </p>
                    )}

                  </div>

                </div>


                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="name"
                      className="bg-gray border-stroke border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      placeholder="Type Seller Description"
                      required=""
                      defaultValue={seller?.description}
                      onChange={handleChange}
                    />
                    {error && (
                      <p className="text-red-500 text-xs mt-1"> {error} </p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      name='status'
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      onChange={handleChange}
                      defaultValue={seller?.status}
                    >
                      <option selected="">Select Status</option>
                      <option value="1" >Active</option>
                      <option value="2" >Inactive</option>

                    </select>

                  </div>
                </div>


                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {setEditData?.id ? "Update" : "Create"}
                  </button>
                </div>



              </form>
            </div>
          </div>
        </div>
      )}
    </>


  )
}

export default withAuth(SellerForm) 