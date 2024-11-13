import withAuth from "@/components/withAuth";
import { COMPROFILE_END_POINT } from "@/constants/api_endpoints/comProfileEndPoints";
import Axios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import toast from "../../components/Toast";

const AddInformation = () => {
    const { http } = Axios();
    const [loading, setLoading] = useState(true);

    const [comProfile, setComProfile] = useState({
        name: "",
        logo: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        company_details: "",
        registration_no: "",
        facebook_url: "",
        twitter_url: "",
        instagram_url: "",
        linkedin_url: "",
        status: "1"
    });

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await http.get(COMPROFILE_END_POINT.list());
                const profileData = response.data?.data[0]; // Access the first item in the array
                if (profileData) {
                    setComProfile(profileData); // Set the fetched data as initial form values
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company profile:", error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [http]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post(COMPROFILE_END_POINT.create(), comProfile);
            if (response.data.status === true) {
                toast({ type: "success", message: response.data.message });
            } else {
                toast({ type: "error", message: response.data.message });
            }
        } catch (error) {
            toast({ type: "error", message: "An error occurred while submitting the form." });
            console.error("Submission error:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mx-auto max-w-270">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Company Information</h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleSubmit}>
                                {/* Company Name */}
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
                                        Company Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Company Name"
                                            defaultValue={comProfile.name || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Email Address and Phone */}
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email Address"
                                                defaultValue={comProfile.email || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Phone Number"
                                            defaultValue={comProfile.phone || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Address and Website */}
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address">
                                            Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="address"
                                                id="address"
                                                placeholder="Address"
                                                defaultValue={comProfile.address || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="website">
                                            Website Link
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="Website Link"
                                            defaultValue={comProfile.website || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="facebook_url">
                                            Facebook Link
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="facebook_url"
                                                id="facebook_url"
                                                placeholder="Facebook Link"
                                                defaultValue={comProfile.facebook_url || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="instagram_url">
                                            Instagram Link
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="instagram_url"
                                            id="instagram_url"
                                            placeholder="Instagram Link"
                                            defaultValue={comProfile.instagram_url || ""}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="mb-5.5">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="company_details">
                                        Company Details
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            className="w-full rounded border border-stroke bg-gray py-3 px-2 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            name="company_details"
                                            id="company_details"
                                            rows={3}
                                            placeholder="Write your bio here"
                                            defaultValue={comProfile.company_details || ""}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Company Logo */}
                                {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">Company Logo</h3>
                                    </div>
                                    <div id="FileUpload" className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    {/* SVG Icon Here */}
                                                {/* </svg>
                                            </span>
                                            <p><span className="text-primary">Click to upload</span> or drag and drop</p>
                                        </div>
                                    </div>
                                </div> */} 

                                <div className="flex justify-end gap-4.5 mt-10">
                                    <button className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95" type="submit">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(AddInformation);
