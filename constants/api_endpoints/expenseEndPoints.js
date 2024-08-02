export const EXPENSE_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}expense/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}expense/update/${id}`,
    // list: (page, limit) => `${process.env.NEXT_PUBLIC_API_URL}expense-list?limit=${page, limit}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}expense-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}expense/${id}`,
    delete:(id) => `${process.env.NEXT_PUBLIC_API_URL}expense/delete/${id}`,
}   