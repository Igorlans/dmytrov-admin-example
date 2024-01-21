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

    const question = await prisma.question.findUnique({
        where: {
            id: context.query.id,
        },
    })
    return {
        props: {
            data: data,
            question,
        },
    }
}

const CreateQuestionPage = ({ data, question }) => {
    checkAuth()

    return (
        <Layout>
            <QuestionDrawer question={question} questions={data} />
        </Layout>
    )
}

export default CreateQuestionPage
