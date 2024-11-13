import React, { useEffect, useState } from "react";
import Image from "next/image";
import withAuth from "@/components/withAuth";
import { COMPROFILE_END_POINT } from "@/constants/api_endpoints/comProfileEndPoints";
import Axios from "@/utils/axios";

const ShowProfile = () => {
  const [loading, setLoading] = useState(true);
  const [comProfile, setComProfile] = useState(null);
  const { http } = Axios();

  // Fetch company profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await http.get(COMPROFILE_END_POINT.list());
        const profileData = response.data?.data[0];
        console.log(profileData) // Access the first item in the array
        setComProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [http]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!comProfile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="relative h-35 md:h-65"></div>

      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <Image
              style={{ borderRadius: '50%' }}
              width={160}
              height={160}
              src={comProfile.logo || "/upload/avater.jpg"} // Use default image if logo is not available
              alt="User"
            />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {comProfile.name || "Company name"}
          </h3>
        </div>
      </div>

      <div className="w-full lg:w-9/12 m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
          <div>
            {[
              { label: "Phone number", value: comProfile.phone },
              { label: "Email", value: comProfile.email },
              { label: "Address", value: comProfile.address },
              { label: "Website Link", value: comProfile.website }
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800">
                <div className="capitalize py-2 w-24 sm:w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">{label}</div>
                <div className="flex-grow text-right lg:text-left py-4">{value || "N/A"}</div>
              </div>
            ))}
          </div>

          <div>
            {[
              { label: "Facebook Link", value: comProfile.facebook_url },
              { label: "Instagram Link", value: comProfile.instagram_url },
              { label: "Company Details", value: comProfile.company_details }
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center border-b border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-gray-800">
                <div className="capitalize py-2 w-24 sm:w-32 font-medium text-gray-900 whitespace-nowrap dark:text-white">{label}</div>
                <div className="flex-grow text-right lg:text-left py-4">{value || "N/A"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ShowProfile);
