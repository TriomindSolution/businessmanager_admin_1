export const EXPENSECATEGORY_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}expensecategory/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}expensecategory/update/${id}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}expensecategory-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}expensecategory/${id}`,
    delete:(id) => `${process.env.NEXT_PUBLIC_API_URL}expensecategory/delete/${id}`,
}   