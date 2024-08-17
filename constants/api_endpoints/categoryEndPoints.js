export const CATEGORY_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}category/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}category/update/${id}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}category-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}category/${id}`,
    delete:(id) => `${process.env.NEXT_PUBLIC_API_URL}category/delete/${id}`,
}   