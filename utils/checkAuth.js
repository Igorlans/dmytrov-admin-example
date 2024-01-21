import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const checkAuth = () => {
  const router = useRouter();
    if (typeof window !== 'undefined') {
      if (!Cookies.get('password')) { 
      router.push('/');
      }
    }
  };
  
export default checkAuth;

