export const COMPROFILE_END_POINT = {
    create: () => `${process.env.NEXT_PUBLIC_API_URL}company-profile/update`,
    update: (id) => `${process.env.NEXT_PUBLIC_API_URL}company-profile/update/${id}`,
    list: () => `${process.env.NEXT_PUBLIC_API_URL}company-profile-list`,
    info: (id) => `${process.env.NEXT_PUBLIC_API_URL}category/${id}`,
    delete: (id) => `${process.env.NEXT_PUBLIC_API_URL}company-profile/${id}/delete`,
}