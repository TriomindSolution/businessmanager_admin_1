// 'use client'
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import Loader from '../components/common/Loader';
import '../styles/globals.css';
import Axios from '../utils/axios';
import LogIn from './login';
import ThemeContext from "../components/context/themeContext";
// import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState();

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
  const providerValues = {
   
  }

  return (
    <>


      {loading ? (
        <Loader />
      ) : (
        <>
        <ThemeContext.Provider value={providerValues}>

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
        </ThemeContext.Provider>

        </>
      )}
    </>
  );

}


export default MyApp;