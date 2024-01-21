import React from "react"
import checkAuth from "@/utils/checkAuth"
import Layout from "@/components/adminpanel/Layout"
import ServiceForm from "@/components/adminpanel/services/ServiceForm"

const CreateService = () => {
    checkAuth()

    return (
        <Layout>
            <ServiceForm />
        </Layout>
    )
}

export default CreateService
