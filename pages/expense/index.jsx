import React, { useEffect, useState, useCallback } from "react";
import { Row, Table, Tag } from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DebouncedSearchInput from '@/components/elements/DebouncedSearchInput';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import withAuth from '@/components/withAuth';
import Axios from '@/utils/axios';
import { EXPENSE_END_POINT } from "@/constants/api_endpoints/expenseEndPoints";
import ToastMessage from "@/components/Toast";
import ExpensForm from "./ExpenseForm";

const Expense = () => {
    /*** Storing data start */
    const { http } = Axios();
    const [expenseList, setExpenseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [limit, setLimit] = useState(10);
    const [editData, setEditData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setViewIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    /*** Storing data end */
    
    
    /**Add function  start */
    const handleAdd = () => {
        setIsModalOpen(true);
        setEditData(null);
    };
    /**Add function end */
    
    
    /** edit function start */
    const handleEdit = (data) => {
        setEditData(data);
        setIsModalOpen(true);
    };
    /** edit function  end */
    
    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    
    
    /** Delete function start */
    const handleDelete = (data) => {
        console.log("clcik")
        setEditData(data);
        setDeleteIsModalOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteIsModalOpen(false);
    };
    /** Delete function end */
    
    
    
    /**Render Function Start */
    const reFetchHandler = (isRender) => {
        if (isRender) fetchExpenseList();
    };
    /**Render Function end */
    
    
    /***Fetching table Data Start */
    
    const fetchExpenseList = async () => {
        try {
            const response = await http.get(EXPENSE_END_POINT.list());
            setExpenseList(response.data?.data);
          
            setLoading(false);
        } catch (error) {
            console.error('Error fetching seller list:', error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchExpenseList();
        return () => {
        };
    }, []);
    
    /***Fetching table Data end */
    
    
    
console.log(expenseList);
    
    
    const columns = [
        {
            title: 'SL',
            fixed: 'left',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Expense Details',
            dataIndex: 'details',
            // fixed: 'left',
        },
        
        {
            title: 'Date',
            dataIndex: 'date',
            // fixed: 'left',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            // fixed: 'left',
        },
       
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (row) => actionButton(row), // You need to define actionButton function
        },
    ];
    
       //----------------- search operation-----------------

       useEffect(() => {
        let controller = new AbortController();
        const result = data?.filter((item) => {
            return item.details.toLowerCase()
                .match(search.toLocaleLowerCase());
        });

        setExpenseList(result);
        return () => controller.abort();
    }, [search]);



    //-----------------End search operation-----------------
    
    const actionButton = (row) => {
        return (
            <>
                <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
                   
    
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
            total: expenseList?.length,
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
    
        const toggleModal = () => {
            console.log("clicked");
            setIsModalOpen(!isModalOpen);
        };


          /***Fetching table Data Start */
    const data = filteredData?.data;
    const fetchExpenseCategoryList = async () => {
        try {
            const response = await http.get(EXPENSE_END_POINT.list());
            setExpenseList(response.data?.data);
            setFilteredData(response?.data)
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

    /***Fetching table Data end */
    
        return (
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            All Expense
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
                    <ExpensecategoryForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />
    */}
                    <Table
                        className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
                        columns={columns}
                        dataSource={expenseList}
                        scroll={{ x: 'max-content' }}
                        pagination={pagination}
                        onChange={onChange}
                    /> 
    
                   
                </div>
            </div>
    
    
        )
    }
    
    export default withAuth(Expense)