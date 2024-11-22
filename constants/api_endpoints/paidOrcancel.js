export const PAIDORCANCEL_END_POINT = {
    get: (type) => `${process.env.NEXT_PUBLIC_API_URL}get-order-stats?type=${type}`,
}