import Layout from "@/components/adminpanel/Layout";
import DataTable from "@/components/adminpanel/Table/Table";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import checkAuth from "@/utils/checkAuth";
import prisma from "@/prisma/client";

export async function getServerSideProps () {
  const requests = await prisma.request.findMany()
  
  return {
    props: {
      data: requests
    },
  }
  
}


const OrdersPage = ({ data }) => {
    const columns = [
        { field: 'tariff', headerName: 'Тариф проєкту' },
        { field: 'square', headerName: 'Площа' },
        { field: 'type', headerName: 'Тип об\'єкту' },
        { field: 'address', headerName: 'Місто' },
        { field: 'street', headerName: 'Вулиця' },
        { field: 'homeNumber', headerName: 'Номер будинку' },
        { field: 'date', headerName: 'Дата замірів' },
        { field: 'comment', headerName: 'Коментар' }
      ];
      checkAuth()

  return (
    <Layout>
    
      <TitlePage title="Заявки"/>
      <DataTable rows={data} columns={columns}/>
    </Layout>
  );
};

export default OrdersPage
