import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { http_get_request } from "../../helpers/http_requests";
import Axios from "../../utils/axios";

const DropdownChannel = () => {

  const { http, saveToken, token, user } = Axios();
  const uid = user?.id;

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState();




  useEffect(() => {
    const controller = new AbortController();

    const getChannelDetails = async () => {
      try {
        setLoading(true);

        const res = await http_get_request({ endpoint: `/channel/v1/getActiveChannel/${uid}` });
        setChannel(res?.results);
      } catch (error) {
        console.error('Error fetching channel details:', error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      getChannelDetails();
    }

    return () => controller.abort();
  }, [uid]);

  return (
    <div className="hidden sm:block">
      <form action="https://formbold.com/s/unique_form_id" method="POST">
        <div className="relative">
          <div className="flex items-center gap-4" href="#">
            <span className="h-12 w-12 "> 
              <Image width={112} height={112} src={`/upload/${channel?.logo_source}`} alt="User" />
            </span>

            <span className="hidden text-right lg:block">
              <span className="block text-base font-bold text-black dark:text-white text-left ">
                {channel?.channel_name}
              </span>

              <div className="flex items-center justify-center">
                <span className={`block uppercase text-sm font-bold ${channel?.status === "active" ? 'text-success dark:text-success' : 'text-danger   dark:text-danger '} h-4`}>
                  <span className="uppercase">{channel?.status}</span>
                </span>

                <span className="bg-black  dark:bg-white h-3 w-0.5 ml-2 mr-2 mt-1 " ></span>
                <Link className="flex items-center" href={`/settings/${channel?.channel_id}`}>
                  <span className="block uppercase text-sm font-medium text-graydark hover:text-primary h-4 dark:text-white">Settings</span>
                </Link>

              </div>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DropdownChannel;
