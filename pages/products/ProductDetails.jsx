import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import html2pdf from "html2pdf.js"; // Import html2pdf.js

const ProductDetails = () => {
    const router = useRouter();
    const { data } = router.query; // Access the query parameter

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

    useEffect(() => {
        if (data) {
            const productData = JSON.parse(data);
            setProduct(productData); // Set product state from the query data
        }
    }, [data]);

    return (
        <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-2 md:p-6 xl:p-7.5 flex flex-col">
                    <div className="card-body print:hidden">
                        <div className="flex flex-col gap-5 md:items-center md:flex-row">
                            <h2 className="text-lg font-bold">Product Details</h2>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded shadow-sm my-6" id="invoice">
                     

                        {/* Product Info */}
                        <div className="grid grid-cols-2 items-center mt-8">
                            <div>
                                <p className="font-bold text-gray-800">Product Name: {product.name}</p>
                                <p className="text-gray-500">SKU Code: {product.product_sku_code}</p>
                                <p className="text-gray-500">Category ID: {product.category_id}</p>
                                <p className="text-gray-500">Seller ID: {product.seller_id}</p>
                            </div>
                            <div className="text-right">
                                <p>
                                    Total Price: <span className="text-gray-500">${product.total_price}</span>
                                </p>
                                <p>
                                    Stock Alert: <span className="text-gray-500">{product.stock_alert}</span>
                                </p>
                                <p>
                                    Date: <span className="text-gray-500">{product.date}</span>
                                </p>
                            </div>
                        </div>

                        {/* Product Pricing */}
                        <div className="mt-4">
                            <p>Per Unit Price: ${product.per_unit_product_price}</p>
                            <p>Product Unit: {product.product_unit}</p>
                            <p>Product Quantity: {product.product_quantity}</p>
                            <p>Product Details: {product.product_details}</p>
                            <p>Status: {product.status === "1" ? "Active" : "Inactive"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
