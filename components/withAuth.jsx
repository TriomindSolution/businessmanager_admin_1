import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Axios from '../utils/axios';

export default function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();
    const { http, setToken, token } = Axios();
    const isAuthenticated = token ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated, router]);

    /*   if (!isAuthenticated) {
      return null; // Render nothing while checking authentication status
    } */

    return <Component {...props} />;
  };
}
