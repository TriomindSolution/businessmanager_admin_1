export const ORDER_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}order/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}order/update/${id}`,
    // list: (page, limit) => `${process.env.NEXT_PUBLIC_API_URL}expense-list?limit=${page, limit}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}order-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}order-retrieve/${id}`,
    delete: (id) => `${process.env.NEXT_PUBLIC_API_URL}order/delete/${id}`,
}