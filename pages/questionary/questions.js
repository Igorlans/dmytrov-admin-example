import Layout from "@/components/adminpanel/Layout";
import TextQuestions from "@/components/adminpanel/Questionnaire/TextQuestions/TextQuestions";
import checkAuth from "@/utils/checkAuth";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
    let questions = await prisma.questionaryQuestion.findMany({
        orderBy: {
            order: "asc",
        },
        include: {
            Tariffes: {
                select: {
                    id: true,
                },
            },
        },
    });

    questions = questions?.map((question) => {
        const newQuestion = {
            ...question,
            tariffes: question?.Tariffes?.map((tariff) => tariff?.id),
        };

        return newQuestion;
    });

    return {
        props: {
            questions: questions || [],
        },
    };
};

const Questions = ({ questions }) => {
    checkAuth();

    return (
        <Layout>
            <TextQuestions questions={questions} />
        </Layout>
    );
};

export default Questions;
