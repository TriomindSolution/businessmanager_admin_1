'use client'
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import Loader from '../components/common/Loader';
import '../styles/globals.css';
import Axios from '../utils/axios';
import LogIn from './login';

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const { http, token, logout } = Axios();


  if (typeof window !== undefined) {
    if (!token) {
      return (
        <>

          {loading ? (
            <Loader />
          ) : (
            <>
            
              <LogIn />

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
                transition={Slide}
              />
            </>
          )}
        </>
      );
    }
  }

  return (
    <>


      {loading ? (
        <Loader />
      ) : (
        <>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
              transition={Slide}
            />


          </Layout>

        </>
      )}
    </>
  );

}


export default MyApp;