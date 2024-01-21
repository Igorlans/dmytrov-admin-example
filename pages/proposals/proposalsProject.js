import Layout from "@/components/adminpanel/Layout"
import TableProposalsProject from "@/components/adminpanel/proposals/proposalsProject"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import checkAuth from "@/utils/checkAuth"
import prisma from "@/prisma/client"
import { useMemo } from "react"
import dayjs from "dayjs"

// export async function getServerSideProps () {
//   const data = await fetch(`${API_URL}api/request`)

//   const resData = await data.json()
//   return {
//     props: {
//       data: resData.data
//     },
//   }

// }

export async function getServerSideProps() {
    const requests = await prisma.request.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            square: true,
            type: true,
            address: true,
            street: true,
            homeNumber: true,
            comment: true,
            date: true,
            status: true,
            adminComment: true,
            questionary: true,
            User: true,
            files: true,
            Tariffes: {
                select: {
                    title: true,
                },
            },
        },
    })
    console.log("REWERTDGF", requests)
    return {
        props: {
            data: JSON.parse(JSON.stringify(requests)),
        },
    }
}

const ProposalsProject = ({ data }) => {
    console.log("DATA =====", data)

    checkAuth()

    return (
        <Layout>
            <TitlePage title="Заявки на проєкти" />
            <TableProposalsProject data={data} />
        </Layout>
    )
}

export default ProposalsProject
