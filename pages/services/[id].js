import prisma from "@/prisma/client"
import Layout from "@/components/adminpanel/Layout"
import ServiceForm from "@/components/adminpanel/services/ServiceForm"
import checkAuth from "@/utils/checkAuth"

export const getServerSideProps = async ({ query }) => {
    const { id } = query

    const service = await prisma.services.findUnique({
        where: {
            id,
        },
    })

    if (!service) return { notFound: true }

    return {
        props: {
            service,
        },
    }
}
const EditService = ({ service }) => {
    checkAuth()

    return (
        <Layout>
            <ServiceForm service={service} />
        </Layout>
    )
}

export default EditService
