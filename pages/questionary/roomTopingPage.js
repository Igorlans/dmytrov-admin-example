import Layout from "@/components/adminpanel/Layout";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import checkAuth from "@/utils/checkAuth";



const RoomToping = ({ data }) => {
    checkAuth()

    return (
      <Layout>
        <TitlePage title="Наповнення приміщень"/>
      </Layout>
    );
};

export default RoomToping