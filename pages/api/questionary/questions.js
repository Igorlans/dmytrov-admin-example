import prisma from "@/prisma/client";
import { updateModelOrder } from "@/utils/updateModelOrder";

const createQuestion = async (req, res) => {
    const body = req.body;

    const tariffQuery = body?.tariffes?.map((tariff) => ({ id: tariff }));

    try {
        let newQuestion = await prisma.questionaryQuestion.create({
            data: {
                text: body.text,
                hint: body.hint,
                isActive: body.isActive,
                type: body.type,
                Tariffes: {
                    connect: tariffQuery,
                },
            },
            include: {
                Tariffes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        newQuestion = {
            ...newQuestion,
            tariffes: newQuestion?.Tariffes?.map((tariff) => tariff?.id),
        };

        const allQuestions = await prisma.questionaryQuestion.findMany({
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allQuestions,
            newItem: newQuestion,
            newOrder: body?.order,
            modelName: "questionaryQuestion",
        });

        res.status(200).json({ message: "good", data: newQuestion });
    } catch (error) {
        throw error;
    }
};

const updateQuestion = async (req, res) => {
    const body = req.body;

    const tariffQuery = body?.tariffes?.map((tariff) => ({ id: tariff }));

    try {
        let newQuestion = await prisma.questionaryQuestion.update({
            where: {
                id: body.id,
            },
            data: {
                text: body.text,
                hint: body.hint,
                isActive: body.isActive,
                type: body.type,
                Tariffes: {
                    set: tariffQuery,
                },
            },
            include: {
                Tariffes: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        newQuestion = {
            ...newQuestion,
            tariffes: newQuestion?.Tariffes?.map((tariff) => tariff?.id),
        };

        const allQuestions = await prisma.questionaryQuestion.findMany({
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allQuestions,
            newItem: newQuestion,
            newOrder: body?.order,
            modelName: "questionaryQuestion",
        });

        res.status(200).json({ message: "good", data: newQuestion });
    } catch (error) {
        throw error;
    }
};

const deleteQuestion = async (req, res) => {
    const body = req.query;
    try {
        const deletedQuestion = await prisma.questionaryQuestion.delete({
            where: {
                id: body.id,
            },
        });

        res.status(200).json({ msg: "good", data: deletedQuestion });
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    const requestMethod = req.method;

    try {
        switch (requestMethod) {
            case "POST":
                await createQuestion(req, res);
                break;
            case "PUT":
                await updateQuestion(req, res);
                break;
            case "DELETE":
                await deleteQuestion(req, res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
