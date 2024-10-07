export const USER_END_POINT = {
    profileUpdate: () => `${process.env.NEXT_PUBLIC_API_URL}profile-update`,
    changePassword: () => `${process.env.NEXT_PUBLIC_API_URL}change-password`,
    profileImage: () => `${process.env.NEXT_PUBLIC_API_URL}profile-image/upload`
}   