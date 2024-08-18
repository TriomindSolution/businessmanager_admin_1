export const PRODUCT_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}product/store`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}product/update/${id}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}product-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}product/${id}`,
    delete:(id) => `${process.env.NEXT_PUBLIC_API_URL}product/delete/${id}`,
    productDelele:(id) =>`${process.env.NEXT_PUBLIC_API_URL}product/product_variant/${id}/delete`
    // product/product_variant/25/delete
}   