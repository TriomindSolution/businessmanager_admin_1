import React, { useEffect, useState, useCallback } from "react";
import Axios from '@/utils/axios';
import { useRouter } from 'next/router';
import { ORDER_END_POINT } from "@/constants/api_endpoints/orderEndPoints";
import { PRODUCT_END_POINT } from "@/constants/api_endpoints/productEndPoints";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import ToastMessage from "@/components/Toast";
const Invoice = () => {

  const router = useRouter();
  const { http } = Axios();
  const {
    isReady,
    query: { id },
  } = router;

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [itemList, setItemList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemOption, setItemOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    invoice_no: "",
    delivery_date: "",
    notes: "",
    payment: "",
    payment_method: "",
    payment_from: "",
    shipping_charge: 0,
    total_amount: 0,
    name: "",
    phone: "",
    address_1: "",
    product_id: "",
    quantity: 0,
    price: 0,
    discount: 0,
    tax: 0,
    product_total: 0,
    size: "",
    color: "",
    sub_total: 0,
    name: ""
  });


  const [items, setItems] = useState([
    {
      id: "",
      quantity: 0,
      price: 0,
      discount: 0,
      tax: 0,
      total: 0,
      size: "",
      color: "",
      product_total: 0,
    },
  ]);

  console.log("items", items)

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: "",
        quantity: 0,
        price: 0,
        discount: 0,
        tax: 0,
        total: 0,
        size: "",
        color: "",
        product_total: 0,
      },
    ]);
  };


  /***Fetching Item Data Start */

  const fetchItemList = async () => {
    try {
      const response = await http.get(PRODUCT_END_POINT.list());

      setItemList(response.data?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching item list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  /***Fetching ExpenseCategory Data end */

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    const newSubTotal = calculateSubTotal(newItems);
    setOrder((prevOrder) => ({
      ...prevOrder,
      sub_total: newSubTotal,
      total_amount: calculateTotalAmount(newSubTotal, prevOrder.shipping_charge),
    }));
  };

  const calculateSubTotal = (items) => {
    return items.reduce((total, item) => total + item.product_total, 0);
  };

  const calculateTotalAmount = (subTotal, shippingCharge) => {
    return subTotal + parseFloat(shippingCharge || 0);
  };


  /***Fetching table Data Start */

  const fetchOderList = async () => {
    try {
      const response = await http.get(ORDER_END_POINT.info(id));
      console.log("response", response)

      if (response.data.status_code === 200) {
        setOrder({
          invoice_no: response.data.data[0]?.invoice_no || "",
          delivery_date: response.data.data[0]?.delivery_date || "",
          notes: response.data.data[0]?.notes || "",
          payment: response.data.data[0]?.payment || "",
          payment_method: response.data.data[0]?.payment_method || "",
          payment_from: response.data.data[0]?.payment_from || "",
          shipping_charge: response.data.data[0]?.shipping_charge || 0,
          total_amount: response.data.data[0]?.total_amount || 0,
          name: response.data.data[0]?.order_customer?.name || "",
          phone: response.data.data[0]?.order_customer?.phone || "",
          address_1: response.data.data[0]?.order_customer?.address_1 || "",
          sub_total: response.data.data[0]?.sub_total || 0,
        });


        setItems(
          response.data.data[0]?.order_variants?.map((variant) => ({
            id: variant?.id || "",
            product_id: variant?.product_id || "",
            quantity: variant?.quantity || 0,
            price: variant?.price || 0,
            discount: variant?.discount || 0,
            tax: variant?.tax || 0,
            product_total: parseFloat(variant?.quantity || 0) * parseFloat(variant?.price || 0),
          })) || [
            {
              id: "",
              product_id: "",
              quantity: 0,
              price: 0,
              discount: 0,
              tax: 0,
              product_total: 0,
            },
          ]
        );
        console.log(response.data.data);
      } else {
        console.log("call")
      }

      // setOrderList(response.data?.data)

      setLoading(false);
    } catch (error) {
      console.error('Error fetching order list:', error);
      setLoading(false);

    }
  };


  // const handleChange = (index, field, value) => {
  //   const newItems = [...items];
  //   newItems[index][field] = value || 0;

  //   const { quantity, price, discount, tax } = newItems[index];
  //   const discountAmount =
  //     (parseFloat(price || 0) * parseFloat(discount || 0)) / 100;
  //   const productTotal =
  //     parseFloat(quantity || 0) * parseFloat(price || 0) -
  //     discountAmount +
  //     parseFloat(tax || 0);

  //   newItems[index].product_total = productTotal;
  //   setItems(newItems);

  //   const newSubTotal = calculateSubTotal(newItems);
  //   setOrder((prevOrder) => ({
  //     ...prevOrder,
  //     sub_total: newSubTotal,
  //     total_amount: calculateTotalAmount(newSubTotal, prevOrder.shipping_charge),
  //   }));
  // };



  const handleChange = async (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value || 0;

    try {
      // Fetch variants specific to the selected product ID
      const response = await http.get(PRODUCT_END_POINT.product_retrieve(value));

      // Check if the response is valid and has the expected data structure
      if (response?.data?.data && Array.isArray(response.data.data)) {
        newItems[index].variants = response.data.data[0]?.product_variants || [];
      } else {
        newItems[index].variants = [];
      }

      // Update calculations
      const { quantity, price, discount, tax } = newItems[index];
      const discountAmount = (parseFloat(price || 0) * parseFloat(discount || 0)) / 100;
      const productTotal = parseFloat(quantity || 0) * parseFloat(price || 0) - discountAmount + parseFloat(tax || 0);

      newItems[index].product_total = productTotal;
      setItems(newItems);

      const newSubTotal = calculateSubTotal(newItems);
      setOrder((prevOrder) => ({
        ...prevOrder,
        sub_total: newSubTotal,
        total_amount: calculateTotalAmount(newSubTotal, prevOrder.shipping_charge),
      }));
    } catch (error) {
      console.error('Error fetching product data:', error);
      // Handle the error if needed, e.g., set an error state or log the error
      newItems[index].variants = []; // Ensure variants are set to an empty array if the API fails
      setItems(newItems);
    }
  };

  const handleOrderChange = (field, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [field]: value,
      total_amount:
        field === "shipping_charge"
          ? calculateTotalAmount(prevOrder.sub_total, value)
          : prevOrder.total_amount,
    }));
  };


  useEffect(() => {
    fetchOderList();
  }, [id]);

  /***Fetching table Data end */

  const handleSubmit = async (event) => {
    const orderPayload = {
      ...order,
      variants: items.map((item) => ({
        id: item.id,
        product_id: item?.product_id,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        tax: item.tax,
        product_total: item.product_total,
        size: item.size,
        color: item.color,
        sub_total: 0,
      })),
    };
    // console.log("order", orderPayload);
    // return;
    const response = await http.put(ORDER_END_POINT.update(id), orderPayload);
    if (response.data.status === true) {
      notify('success', response.data.message);
      router.push('/invoices')
    } else {
      notify('error', response.data.message);
    }
  }
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
                  id="invoiceID"
                  placeholder="Invoice No"
                  value={order.invoice_no}
                  onChange={(e) =>
                    handleOrderChange("invoice_no", e.target.value)
                  }
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

                  name='delivery_date'
                  placeholder="Delivery Date"
                  value={order.delivery_date}
                  onChange={(e) =>
                    handleOrderChange("delivery_date", e.target.value)
                  }
                />
              </div>
            </div>


            <div className="w-full sm:w-1/4">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor='invoice_no'
              >
                Customer Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  placeholder="Name"
                  value={order.name}
                  onChange={(e) =>
                    handleOrderChange("name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="w-full sm:w-1/4">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor='invoice_no'
              >
                Customer Phone Number
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name='phone'
                  placeholder="Phone"
                  value={order.phone}
                  onChange={(e) =>
                    handleOrderChange("phone", e.target.value)
                  }
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
                Address
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name='address'
                  id='invoice_no'
                  placeholder="Address"
                  value={order.address_1}
                  onChange={(e) =>
                    handleOrderChange("address_1", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="w-full sm:w-1/4">
              <label
                className="mb-2 block text-sm font-medium text-black dark:text-white"
                htmlFor='invoice_no'
              >
                Order Status

              </label>
              <div className="relative">
                <select
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  data-choices=""
                  data-choices-search-false=""
                  name="order_status"
                  id="order_status"
                  value={order.payment}
                  onChange={(e) =>
                    handleOrderChange("payment", e.target.value)
                  }

                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value={1}>Pending</option>
                  <option value={2}>Processing</option>
                  <option value={3}>Shipped </option>
                  <option value={4}>Delivered</option>
                  <option value={5}>Cancelled </option>
                  <option value={6}>Returned </option>
                </select>
              </div>
            </div>

            <div className="w-full sm:w-1/4">
            </div>

            <div className="w-full sm:w-1/4">
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

                {items.map((item, index) => (
                  <tr className="item" key={index}>
                    <td className="border border-slate-200 dark:border-zinc-500">
                      <select
                        value={item.id}
                        onChange={(e) => handleChange(index, "id", e.target.value)}
                      >
                        <option value="" disabled>Choose an Item</option>
                        {itemList.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>

                      {/* Variants dropdown specific to each item */}
                      {item.variants && item.variants.length > 0 && (
                        <select
                          value={item.variant_id || ""}
                          onChange={(e) => handleChange(index, "variant_id", e.target.value)}
                        >
                          <option value="" disabled>Choose a Variant</option>
                          {item.variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.color} - Size: {variant.size}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>

                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                      <div className="flex justify-center text-center input-step">
                        <input
                          type="number"
                          className="item-quantity w-full text-center p-2"
                          min={0}
                          max={100}
                          value={item.quantity}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </td>
                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                      <input
                        type="number"
                        className="item-price w-full p-2 text-center"
                        placeholder="$00.00"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                      <input
                        type="number"
                        className="item-discount w-full p-2 text-center"
                        placeholder="0%"
                        value={item.discount}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "discount",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="w-40 border border-slate-200 dark:border-zinc-500">
                      <input
                        type="number"
                        className="item-tax w-full p-2 text-center"
                        placeholder="0%"
                        value={item.tax}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "tax",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="border border-slate-200 dark:border-zinc-500">
                      <input
                        type="text"
                        className="cart-total w-full p-2 text-center"
                        value={item.product_total}
                      />
                    </td>
                    <td className="border border-slate-200 dark:border-zinc-500 px-6 py-1.5">
                      <a
                        onClick={() => handleRemoveItem(index)}
                        className="text-danger flex items-center justify-center"
                        aria-label="Delete"
                      >
                        <DeleteOutlined style={{ fontSize: '22px' }} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <button
                      type="button"
                      id="addItemButton"
                      className="bg-primary border-dashed text-black btn border-custom-500 mt-4 p-2"
                      onClick={handleAddItem}
                    >
                      Add Item
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody id="totalAmount">
                <tr>
                  <td colSpan={5} />
                  <td className="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zinc-200 dark:border-zinc-500">
                    Shipping Charge
                  </td>
                  <td className="font-medium border-b border-slate-200 dark:border-zinc-500">
                    <input
                      className="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zinc-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zinc-600 disabled:border-slate-300 dark:disabled:border-zinc-500 dark:disabled:text-zinc-200 disabled:text-slate-500 dark:text-zinc-100 dark:bg-zinc-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zinc-200 cart-shipping"
                      type="number"
                      value={order.shipping_charge}
                      onChange={(e) => handleOrderChange("shipping_charge", e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} />
                  <td className="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zinc-200 dark:border-zinc-500">
                    Total Amount
                  </td>
                  <td className="font-medium border-b border-slate-200 dark:border-zinc-500">
                    <input
                      type="text"
                      id="totalAmount"
                      value={order.total_amount}
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
                Payment From
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name='payment_from'
                  id='invoice_no'
                  placeholder="Payment From"
                  value={order.payment_from}
                  onChange={(e) =>
                    handleOrderChange("payment_from", e.target.value)
                  }
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
                  name='payment_method'
                  id='invoice_no'
                  value={order.payment_method}
                  onChange={(e) =>
                    handleOrderChange(
                      "payment_method",
                      e.target.value
                    )
                  }
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

                <select
                  className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  data-choices=""
                  data-choices-search-false=""
                  name="paymentStatus"
                  id="paymentStatus"
                  value={order.payment}
                  onChange={(e) =>
                    handleOrderChange("payment", e.target.value)
                  }

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
          <div className="mb-3">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="address"
            >
              Notes
            </label>
            <div className="relative">


              <textarea
                className="w-full rounded border border-black bg-gray-100 py-2 pl-5 pr-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                id="bio"
                rows={3}
                placeholder="Write your details here"

                name="notes"
                value={order.notes}
                onChange={(e) =>
                  handleOrderChange("notes", e.target.value)
                }
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
              onClick={handleSubmit}
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
  )
}

export default Invoice