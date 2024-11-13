import React from "react";

const TableFour = ({ data }) => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Top Selling Products
            </h4>
          </div>
          {/* <DropdownDefault /> */}
        </div>

        <div className="flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product Name
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Total Orders
              </h5>
            </div>
          </div>

          {/* Table Body */}
          {data?.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-200"
            >
              <div className="flex items-centers gap-3 p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {product.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {product.total_orders}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
