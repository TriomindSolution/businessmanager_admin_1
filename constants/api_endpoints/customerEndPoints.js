export const CUSTOMER_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}customer/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}customer/update/${id}`,
    // list: (page, limit) => `${process.env.NEXT_PUBLIC_API_URL}expense-list?limit=${page, limit}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}customer-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}customer-retrieve/${id}`,
    delete: (id) => `${process.env.NEXT_PUBLIC_API_URL}customer/delete/${id}`,
}