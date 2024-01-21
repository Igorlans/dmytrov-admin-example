import checkAuth from "@/utils/checkAuth"
import Layout from "@/components/adminpanel/Layout"
import SeoForm from "@/components/adminpanel/Seo/SeoForm"
import prisma from "@/prisma/client"

export const getServerSideProps = async (ctx) => {
    const seoItem = await prisma.seo.findUnique({
        where: {
            id: ctx.query.id,
        },
    })

    return {
        props: {
            seoItem,
        },
    }
}

const EditSeo = ({ seoItem }) => {
    checkAuth()
    return (
        <Layout>
            <SeoForm seoItem={seoItem} />
        </Layout>
    )
}

export default EditSeo
