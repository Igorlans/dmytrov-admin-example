import checkAuth from "@/utils/checkAuth"
import Layout from "@/components/adminpanel/Layout"
import SeoForm from "@/components/adminpanel/Seo/SeoForm"

const CreateSeo = () => {
    checkAuth()
    return (
        <Layout>
            <SeoForm />
        </Layout>
    )
}

export default CreateSeo
