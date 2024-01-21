import React from "react";
import prisma from "@/prisma/client";
import checkAuth from "@/utils/checkAuth";
import Layout from "@/components/adminpanel/Layout";
import View from "@/components/adminpanel/Questionnaire/View/View";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";

export async function getServerSideProps(ctx) {
    const requests = await prisma.request.findUnique({
        where: {
            id: ctx.query.id,
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
            questionary: true,
            User: true,
            Tariffes: {
                select: {
                    title: true,
                },
            },
        },
    });
    console.log("REWERTDGF", requests);
    return {
        props: {
            data: JSON.parse(JSON.stringify(requests)),
        },
    };
}

const QuestionaryPage = ({ data }) => {
    checkAuth();
    console.log("ANKETA",data);
    return (
        <Layout>
            <TitlePage title="Анкета користувача"/>
            <View data={data}/>
        </Layout>
    );
};

export default QuestionaryPage;
