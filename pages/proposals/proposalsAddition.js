import Layout from "@/components/adminpanel/Layout";
import TableProposalsAddition from "@/components/adminpanel/proposals/proposalsAddition";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import checkAuth from "@/utils/checkAuth";
import prisma from "@/prisma/client";

export async function getServerSideProps() {
  let servicesRequests = await prisma.servicesRequest.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      createdAt: true,
      Services: {
        select: {
          title: true
        }
      },
      User: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true
        }
      }
    }
  })
  servicesRequests = JSON.parse(JSON.stringify(servicesRequests))
  return {
    props: {
      data: servicesRequests
    },
  }

}

// {
//   id: 1,
//     client: 'Ivanov',
//     dateCreate: 1679098255756,
//     phone: '123-45-67',
//     email: 'ivanov@example.com',
//     address: 'Main Street 1',
//     additionalService: 'Basic',
//     status: 1,
// },



const ProposalsAddition = ({data}) => {

  checkAuth()

  return (
    <Layout>
      <TitlePage title="Заявки на дод.послуги"/>
      <TableProposalsAddition data={data} />
    </Layout>
  );
};

export default ProposalsAddition
