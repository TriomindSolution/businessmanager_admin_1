import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosApi = axios.create({
    baseURL: API_URL
  });
  
  axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  //pass new generated access token here
// Bearer Access Token
const setAccessToken = () => {
    const localeAuth = localStorage.getItem("token");
    const authUser = localStorage.getItem("token")
      ? localeAuth
      : null;
  
    let token = (authUser && authUser.accessToken) || "";
    let accessToken = `Bearer eyo4eiroejrlejrlkerjlkerf`;
    axiosApi.defaults.headers.common['Authorization'] = localeAuth;
  };

  export async function get(url, config= {}) {
    setAccessToken();
    if(config && config?.responseType === 'blob') {
      axiosApi.defaults.headers.common['Content-Type'] = 'blob';
    };
    return await axiosApi.get(url, { ...config }).then((response) => response.data);
  }
  
  export async function post(url, data, config = {}) { 
    setAccessToken();
    return axiosApi.post(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function put(url, data, config = {}) {
    setAccessToken();
    return axiosApi.put(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function patch(url, data, config = {}) {
    setAccessToken();
    return axiosApi.patch(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function del(url, config = {}) {
    setAccessToken();
    return await axiosApi.delete(url, { ...config }).then((response) => response.data);
  }