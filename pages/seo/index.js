import Layout from "@/components/adminpanel/Layout"
import checkAuth from "@/utils/checkAuth"
import Seo from "@/components/adminpanel/Seo/Seo"
import prisma from "@/prisma/client"

export const getServerSideProps = async () => {
    const seo = await prisma.seo.findMany()

    return {
        props: {
            seo,
        },
    }
}

const Index = ({ seo }) => {
    checkAuth()

    return (
        <Layout>
            <Seo seo={seo} />
        </Layout>
    )
}

export default Index
