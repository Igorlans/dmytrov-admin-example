import { Backdrop, Button, CircularProgress } from "@mui/material"
import * as React from "react"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import checkAuth from "@/utils/checkAuth"
import Layout from "@/components/adminpanel/Layout"
import prisma from "@/prisma/client"
import { useState } from "react"
import ServiceItem from "@/components/adminpanel/services/ServiceItem"
import ServiceForm from "@/components/adminpanel/services/ServiceForm"
import { useRouter } from "next/router"

export async function getServerSideProps() {
    const services = await prisma.services.findMany({
        orderBy: { order: "asc" },
    })

    return {
        props: {
            data: services,
        },
    }
}

const AllServices = ({ data }) => {
    checkAuth()
    const router = useRouter()
    const onEdit = (id) => {
        router.push(`/services/${id}`)
    }

    return (
        <Layout>
            <TitlePage title="Послуги" />
            <Button
                variant="contained"
                onClick={() => router.push("/services/create")}
            >
                Додати послугу
            </Button>
            <div className={"mt-8"}>
                {data?.map((service, index) => (
                    <ServiceItem
                        service={service}
                        key={index}
                        onEdit={() => onEdit(service.id)}
                        number={index + 1}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default AllServices
