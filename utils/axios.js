import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Axios() {
    const router = useRouter();


    const getToken = () => {
        if (typeof window !== 'undefined') {

            const tokenString = localStorage.getItem('token');
            return tokenString;
        }
    }

    const getUser = () => {

        if (typeof window !== 'undefined') {
            try {
                const userString = localStorage.getItem('token');
                return userString;
              } catch (error) {
                console.log(error)
              }
            
        }
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (token) => {
      
        localStorage.setItem('token', token);
        setToken(token);
        router.replace("/profile/user/", "/dashboard");
        router.reload();
    }

    function logout(){
        localStorage.clear();
         router.replace("/");
         router.reload();
      }

    const http = axios.create({
        baseURL: "http://localhost:5000/api/v1/auth",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": `Bearer ${token}`
        }
    });

    
    return {
        setToken: saveToken,
        token,
        getToken,
        logout,
        http
    }
}