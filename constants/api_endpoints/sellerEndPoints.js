export const SELLER_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}seller/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}seller/update/${id}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}seller-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}seller/${id}`,
    delete:(id) => `${process.env.NEXT_PUBLIC_API_URL}seller/delete/${id}`,
}   