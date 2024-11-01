import Axios from '@/utils/axios';
import React, { useEffect, useState, useCallback } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToastMessage from "@/components/Toast";
import withAuth from '@/components/withAuth';
import { PRODUCT_END_POINT } from '@/constants/api_endpoints/productEndPoints';
import { Row, Table, Tag } from 'antd';
import DebouncedSearchInput from '@/components/elements/DebouncedSearchInput';
import { useRouter } from 'next/router';

const ProdctList = () => {

    /*** Storing data start */
    const { http } = Axios();
    const router = useRouter();
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [isViewModalOpen, setViewIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    /** Add start */
    const handleAdd = () => {

        setEditData(null);

        router.push({
            pathname: "../products/ProductForm",
            query: { data: null },
        });
    };

    /** Add end */

        /**Job edit start */
        const handleEdit = (data) => {
            setEditData(data);
    
            router.push({
                pathname: "../products/ProductForm",
                // query: { data: data },
                query: { data: JSON.stringify(data) },
            });
        };
        /**Job edit end */

    /**Product view estart */
        const handleViewOpen=(data)=>{

            router.push(
            {
            
                pathname:"../products/ProductDetails",
                query: { data: JSON.stringify(data) },
            
            }
            );
            };

               /**Product view Finsih */




    /***Fetching table Data Start */
    const data = filteredData?.data;
    console.log(data);
    const fetchProductList = async () => {
        try {
            const response = await http.get(PRODUCT_END_POINT.list());
            setProductList(response.data?.data?.data);
            setFilteredData(response?.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seller list:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductList();
        return () => {
        };
    }, []);







    
   //----------------- search operation-----------------

   //show error when i search _data.filter is not a function
   useEffect(() => {
    let controller = new AbortController();
    const result = data?.filter((item) => {
        return item.phone.toLowerCase()
            .match(search.toLocaleLowerCase());
    });

    setProductList(result);
    return () => controller.abort();
}, [search]);



//-----------------End search operation-----------------

    const columns = [
        {
            title: "SL",
            fixed: 'left',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },

        {
            title: 'Unit Price',
            dataIndex: 'per_unit_product_price',
        },

        {
            title: 'Stock',
            dataIndex: 'product_unit',
        },



        


      {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (row) => actionButton(row),
        }
    ];

    const actionButton = (row) => {
        return (
            <>
                <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
                <a onClick={() => handleViewOpen(row)} style={{ color: 'green' }}>
                    <EyeOutlined style={{ fontSize: '22px' }} />
                </a>

                    <a onClick={() => handleEdit(row)} className="text-primary" >
                        <EditOutlined style={{ fontSize: '22px' }} />
                    </a>

                    <a onClick={() => handleDelete(row)} className="text-danger" >
                        <DeleteOutlined style={{ fontSize: '22px' }} />
                    </a>
                </Row>
            </>
        );
    };

    /*** Pagination Start  */
    const pagination = {
        total: productList?.length,
        current: page,
        pageSize: perPage,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['2', '5', '10', '20', '30']
    };

    const onChange = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
    };

    /*** Pagination End  */
    /***Fetching table Data end */
    return (
        <div className="flex flex-col gap-10">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Product
                    </h4>
                    <button
                        href="#"
                        className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        onClick={handleAdd}
                    >
                        Add
                        <span className="button-icon-space ml-5">
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </span>
                    </button>
                </div>



                <div className="p-4 md:p-6 xl:p-7.5 flex justify-end">
                    <DebouncedSearchInput setSearch={setSearch} />
                </div>
                {/* <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} />
                <ExpensecategoryForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} /> */}

                <Table
                    className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
                    columns={columns}
                    dataSource={productList}
                    scroll={{ x: 'max-content' }}
                    pagination={pagination}
                    onChange={onChange}
                />


            </div>
        </div>
    )
}

export default withAuth(ProdctList)