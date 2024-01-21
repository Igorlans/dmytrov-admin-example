import QuestionItem from "@/components/adminpanel/questions/questionsitem"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import checkAuth from "@/utils/checkAuth"
import Button from "@mui/material/Button"
import Layout from "@/components/adminpanel/Layout"
import prisma from "@/prisma/client"
import { useState } from "react"
import QuestionDrawer from "@/components/adminpanel/questions/drawer"
import { useRouter } from "next/navigation"

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

const QuestionPage = ({ data }) => {
    checkAuth()

    const router = useRouter()

    return (
        <Layout>
            <TitlePage title="Питання та відповіді" />
            <Button
                variant="contained"
                onClick={() => router.push("/questions/create")}
            >
                Додати питання
            </Button>
            <div className={"mt-8"}>
                {data?.map((question, index) => (
                    <QuestionItem
                        question={question}
                        key={index}
                        number={index + 1}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default QuestionPage
