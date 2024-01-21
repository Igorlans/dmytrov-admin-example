import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar"

const Layout = ({ children, data }) => {
    const a = false
    const router = useRouter()
    // useEffect(() => {
    //     if(!a) {
    //         router.push('/login')
    //     } 
    // }, [])

    return (
        <div className="wrapper bg-white">
            <Sidebar />
          <div className="p-20">
            {children}
          </div>
        </div>
      );
}
export default Layout

// if (!Cookies.get('password')) { 
//     router.push('/');
//     }

// const currentPass = Cookies.get('password');
//   if (currentPass === '111') {
//     return (
//       <div className="wrapper">
//         <div>
//           <Sidebar />
//         </div>
//         <div className="p-20">
//           {children}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="wrapper_auth">
//         <div className="p-20">
//           {children}
//         </div>
//       </div>
//     );
//   }