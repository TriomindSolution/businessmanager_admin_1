import ToastMessage from "@/components/Toast";
import { CATEGORY_END_POINT } from "@/constants/api_endpoints/categoryEndPoints";
import { SELLER_END_POINT } from "@/constants/api_endpoints/sellerEndPoints";
import { mapArrayToDropdown } from "@/helpers/common_Helper";
import Axios from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { PRODUCT_END_POINT } from "@/constants/api_endpoints/productEndPoints";
import withAuth from "@/components/withAuth";

const ProductForm = () => {
    const { http } = Axios();

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const router = useRouter();
    const [editData, setEditData] = useState(false);
    const { data } = router.query;
    let parsedData;

    if (data) {
        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            parsedData = null;
        }
    } else {
        parsedData = null;
    }
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const [sellerOption, setSellerOption] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        per_unit_product_price: null,
        product_unit: null,
        stock_alert: null,
        category_id: null,
        seller_id: null,
        product_quantity: null,
        total_price: null,
        product_details: '',
        product_sku_code: '',
        date: '',
        status: "",
    });
    const [variants, setVariants] = useState([
        { size: '', color: '', quantity: '' }
    ]);


    useEffect(() => {
        if (data === null) {
            setEditData(false);
        } else {
            try {
                setEditData(true);
                setProduct({
                    id: parsedData?.id,
                    name: parsedData?.name,
                    per_unit_product_price: parsedData?.per_unit_product_price,
                    product_unit: parsedData?.product_unit,
                    stock_alert: parsedData?.stock_alert,
                    category_id: parsedData?.category_id,
                    seller_id: parsedData?.seller_id,
                    product_quantity: parsedData?.product_quantity,
                    total_price: parsedData?.total_price,
                    product_details: parsedData?.product_details,
                    product_sku_code: parsedData?.product_sku_code,
                    date: parsedData?.date,
                    status: parsedData?.status,
                });

                // Set variants state
                const formattedVariants = parsedData?.product_variants.map(variant => ({
                    id: variant.id,
                    size: variant.size,
                    color: variant.color,
                    quantity: variant.quantity
                }));
                setVariants(formattedVariants);
            } catch (error) {
                console.error("Error parsing JSON data:", error);
            }
        }
    }, [data]);

    /***Fetching ExpenseCategory Data Start */

    const fetchExpenseCategoryList = async () => {
        try {
            const response = await http.get(CATEGORY_END_POINT.list());
            setCategoryList(response.data?.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seller list:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseCategoryList();
        return () => {
        };
    }, []);

    /***Fetching ExpenseCategory Data end */

    /**Category dropdown */
    useEffect(() => {
        const EXPENCTGRYDROPDOWN = mapArrayToDropdown(
            categoryList,
            'name',
            'id'
        );

        const allCtgry = EXPENCTGRYDROPDOWN?.map((item) => ({
            id: item?.id,
            value: item?.category_name,
        }));
        setCategoryOption(allCtgry);
    }, [categoryList]);


    /**fetch Category dropdown list  End */


    /***Fetching Seller Data Start */

    const fetchSellerList = async () => {
        try {
            // const response = await http.get(SELLER_END_POINT.list(page,limit));
            const response = await http.get(SELLER_END_POINT.list());
            setSellerList(response.data?.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seller list:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerList();
        return () => {
        };
    }, []);

    /**Seller dropdown */
    useEffect(() => {
        const SELLERDROPDOWN = mapArrayToDropdown(
            sellerList,
            'name',
            'id'
        );

        const allSeller = SELLERDROPDOWN?.map((item) => ({
            id: item?.id,
            value: item?.name,
        }));
        setSellerOption(allSeller);
    }, [sellerList]);
    /**fetch Seller dropdown list  End */
    /***Fetching Seller Data end */


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));


    };


    const handleChangeVariants = (index, e) => {
        const { name, value } = e.target;
        const updatedVariants = [...variants];
        updatedVariants[index][name] = value;
        setVariants(updatedVariants);
    };

    // const addVariant = () => {
    //     setVariants([...variants, { size: '', color: '', quantity: '' }]);
    // };

    const addVariant = () => {
        setVariants((prevVariants) => [...(prevVariants || []), { size: '', color: '', quantity: '' }]);
    };


    const removeVariant = async (index, variant) => {
        // const updatedVariants = [...variants];
        // updatedVariants.splice(index, 1);
        // setVariants(updatedVariants);
        console.log(variant)


        try {
            const response = await http.delete(PRODUCT_END_POINT.productDelele(variant?.id));
            console.log("response", response);

            if (response.data.status === true) {
                notify('success', response.data.message);
                const updatedVariants = [...variants];
                updatedVariants.splice(index, 1);
                setVariants(updatedVariants);
                // onClose();
            } else {
                notify('error', response.data.message);
            }
        } catch (error) {
            notify('error', error.message);
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine product and variants into a single object with correct field names
        const payload = {
            category_id: product.category_id,
            seller_id: product.seller_id,
            name: product.name,
            per_unit_product_price: product.per_unit_product_price,
            product_unit: product.product_unit,
            product_quantity: product.product_quantity,
            total_price: product.total_price,
            stock_alert: product.stock_alert,
            product_details: product.product_details,
            status: product.status,
            date: product.date,
            product_sku_code: product.product_sku_code,
            variants: variants.map(variant => ({
                id: variant.id,
                size: variant.size,
                color: variant.color,
                quantity: variant.quantity
            }))
        };

        try {
            let response;
            if (product?.id) {
                response = await http.put(PRODUCT_END_POINT.update(product?.id), payload);
            } else {
                response = await http.post(PRODUCT_END_POINT.create(), payload);
            }

            if (response.data.status === true) {
                notify('success', response.data.message);
                router.push('/products')
            } else {
                notify('error', response.data.message);
            }
        } catch (error) {
            notify('error', 'An error occurred while submitting the data.');
            console.error("Error submitting data:", error);
        }
    };


    const handeCancel=async(e)=>{

        router.push('/products')

    }

    useEffect(() => {
        const calculatedPrice =
            (parseFloat(product.product_quantity) || 0) *
            (parseFloat(product.per_unit_product_price) || 0);
        setProduct(prev => ({ ...prev, total_price: calculatedPrice }));
    }, [product.product_quantity, product.per_unit_product_price]);


    return (
        <div className="mx-auto max-w-250">
            <div className="grid grid-cols-6 gap-8">
                {/* Guardian Information start */}
                <div className="col-span-6 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Product
                            </h3>

                        </div>

                        <div className="p-7">
                            <form>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Name
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="name"
                                                id="fullName"
                                                placeholder="Enter the product name"
                                                defaultValue={product?.name}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            category
                                        </label>
                                        <div className="relative">

                                            <select
                                                name="category_id"
                                                id="tuitionType"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                value={product?.category_id}
                                                onChange={handleChange}
                                            >


                                                {categoryOption && (
                                                    <>
                                                        <option value="" disabled>
                                                            Choose a Category
                                                        </option>
                                                        {categoryOption.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.value}
                                                            </option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                    {/* <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Product Unit <span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                name="product_unit"
                                                id="fullName"
                                                placeholder="Enter the product unit"
                                                defaultValue={product?.product_unit}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div> */}

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Product Quantity
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                placeholder="Enter product quantity"
                                                name="product_quantity"
                                                value={product.product_quantity}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Unit Price <span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                placeholder="Enter unit price"
                                                name="per_unit_product_price"
                                                value={product.per_unit_product_price}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>


                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">



                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Product Sku Code
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                id="fullName"
                                                placeholder="Enter the product quantity"
                                                name="product_sku_code"
                                                defaultValue={product?.product_sku_code}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Stock Alert<span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                id="fullName"
                                                placeholder="Enter the stock alert"
                                                name="stock_alert"
                                                defaultValue={product?.stock_alert}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">



                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Seller <span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <select
                                                id="tuitionType"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                name="seller_id"
                                                onChange={handleChange}
                                                value={product?.seller}
                                            >


                                                {sellerOption && (
                                                    <>
                                                        <option value="" disabled>
                                                            Choose a Seller
                                                        </option>
                                                        {sellerOption.map((seller) => (
                                                            <option key={seller.id} value={seller.id}>
                                                                {seller.value}
                                                            </option>
                                                        ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Date<span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="date"
                                                id="fullName"
                                                placeholder="Enter the stock alert"
                                                name="date"
                                                defaultValue={product?.date}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Total Price<span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="number"
                                                name="total_price"
                                                value={product.total_price}
                                                readOnly
                                            />
                                        </div>

                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="fullName"
                                        >
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <div className="relative">

                                            <select
                                                id="tuitionType"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                name="status"
                                                onChange={handleChange}
                                                value={product?.seller}
                                            >

                                                <option selected="">Select category</option>
                                                <option value="1">Active</option>
                                                <option value="2">Inactive</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">




                                </div>


                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="address"
                                    >
                                      Details
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4.5 top-4">
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                        fill=""
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_88_10224">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>

                                        <textarea
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            id="bio"
                                            rows={3}
                                            placeholder="Write your details here"
                                            onChange={handleChange}
                                            value={product?.details}
                                            name="details"
                                        />

                                        <p
                                            id="emailError"
                                            className="mt-1 text-sm text-red-500"
                                        />

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* Guardian Information end */}

                {/* Tutor Information start */}
                <div className="col-span-6 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="grid items-center grid-cols-1 gap-3 border-b border-stroke py-4 px-7 dark:border-strokedark 2xl:grid-cols-12">
                            <div className="2xl:col-span-3">
                                <h3 className="font-medium text-black dark:text-white">
                                    Variants
                                </h3>
                            </div>
                            <div className="2xl:col-span-3 2xl:col-start-10">
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        onClick={addVariant}
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle} /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-7">

                            {variants?.map((variant, index) => (

                                <div key={index} className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    {/* Size Input */}
                                    <div className="w-full sm:w-1/3">
                                        <label
                                            htmlFor={`size${index}`}
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            Size <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id={`size${index}`}
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                required
                                                name="size"
                                                value={variant.size}
                                                onChange={e => handleChangeVariants(index, e)}
                                            />
                                        </div>
                                    </div>

                                    {/* Color Input */}
                                    <div className="w-full sm:w-1/3">
                                        <label
                                            htmlFor={`color${index}`}
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            Color <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id={`color${index}`}
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                required
                                                name="color"
                                                value={variant.color}
                                                onChange={e => handleChangeVariants(index, e)}
                                            />
                                        </div>
                                    </div>

                                    {/* Quantity Input */}
                                    <div className="w-full sm:w-1/3">
                                        <label
                                            htmlFor={`quantity${index}`}
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                type="number"
                                                id={`quantity${index}`}
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary mr-2"
                                                required
                                                name="quantity"
                                                value={variant.quantity}
                                                onChange={e => handleChangeVariants(index, e)}
                                            />
                                            {/* {index !== 0 && (
                                                <button onClick={() => removeVariant(index, variant)} className="flex items-center text-danger">
                                                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                                                </button>
                                            )} */}


                                            <button onClick={() => removeVariant(index, variant)} className="flex items-center text-danger">
                                                <FontAwesomeIcon icon={faTrashAlt} className="mr-2 text-xl" />
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="flex justify-end gap-2 mt-5.5 p-4 border-t border-slate-200 dark:border-zink-500">
                        <button
                           onClick={handeCancel}
                            type="button"
                            className="text-red-500 py-2 px-5  border border-stroke rounded-full bg-danger text-white focus:bg-red-100   dark:bg-zink-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10 dark:active:bg-red-500/10"
                        >
                            <i data-lucide="x" className="inline-block size-4" />
                            <span className="align-middle">Cancel</span>
                        </button>
                     
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="text-white py-2 px-5 rounded-full border border-custom-500  hover:text-white bg-primary hover:border-custom-600 focus:text-white  focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
                        >
                            Submit
                        </button>
                    </div>


                </div>
                {/* Tutor Information end */}
            </div>
        </div>
    )
}

export default withAuth(ProductForm)