import React from 'react'

const SignUpFirstComponent = ({ otpSent, setPostEmailOtp, postEmailOtp }) => {

    console.log("postEmailOtp", postEmailOtp);

    const handleChange = (e) => {
        setPostEmailOtp((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <>

            {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Register your account!
            </h2>

            <form onSubmit={otpSent}>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    name='name'
                                    type="text"
                                    placeholder="Enter your Name"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={handleChange}
                                />



                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    name='email'
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={handleChange}
                                />

                                <span className="absolute right-4 top-4">
                                    <svg
                                        className="fill-current"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.5">
                                            <path
                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                            phone
                            </label>
                            <div className="relative">
                                <input
                                    name='phone'
                                    type="text"
                                    placeholder="Enter your phone"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={handleChange}
                                />



                            </div>
                        </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                            password
                            </label>
                            <div className="relative">
                                <input
                                    name='password'
                                    type="text"
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={handleChange}
                                />



                            </div>
                        </div>
                    </div>
                </div>




                <div className="mb-5">
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                </div>

            </form>

        </>
    )
}

export default SignUpFirstComponent