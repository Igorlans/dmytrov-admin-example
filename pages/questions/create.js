import QuestionItem from "@/components/adminpanel/questions/questionsitem"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import checkAuth from "@/utils/checkAuth"
import Button from "@mui/material/Button"
import Layout from "@/components/adminpanel/Layout"
import prisma from "@/prisma/client"
import { useState } from "react"
import QuestionDrawer from "@/components/adminpanel/questions/drawer"

export async function getServerSideProps(context) {
    const data = await prisma.question.findMany({
        orderBy: { order: "asc" },
    })

    return {
        props: {
            data: data,
        },
    }
}

const CreateQuestionPage = ({ data, question }) => {
    checkAuth()

    return (
        <Layout>
            <QuestionDrawer questions={data} />
        </Layout>
    )
}

export default CreateQuestionPage
