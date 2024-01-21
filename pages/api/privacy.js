import prisma from "../../prisma/client"
import { updateModelOrder } from "@/utils/updateModelOrder"

const addQuestion = async (req, res) => {
    const body = req.body
    console.log(body)

    try {
        const newPolicy = await prisma.privacy.create({
            data: {
                title: body.title,
                title_ru: body.title_ru,
                descr: body.descr,
                descr_ru: body.descr_ru,
            },
        })

        // const allQuestions = await prisma.question.findMany({
        //     orderBy: {
        //         order: "asc",
        //     },
        // })

        // await updateModelOrder({
        //     modelsToReorder: allQuestions,
        //     newItem: newQuestion,
        //     newOrder: body?.order,
        //     modelName: "question",
        // })

        res.status(200).json({ msg: "good", data: newPolicy })
    } catch (error) {
        throw error
    }
}

// async function deleteItemById(req, res) {
//     const id = req.query.id
//     try {
//         const deletedItem = await prisma.question.delete({
//             where: {
//                 id,
//             },
//         })
//         return res.status(200).json({ message: "good", data: deletedItem })
//     } catch (error) {
//         throw error
//     }
// }

// const getAllQuestion = async (req, res) => {
//     const body = req.query
//     try {
//         const data = await prisma.Question.findMany({
//             orderBy: { order: "asc" },
//         })
//         res.status(200).json({ msg: "good", data: data })
//     } catch (error) {
//         throw error
//     }
// }

const updateQuestion = async (req, res) => {
    const body = req.body
    try {
        const newPolicy = await prisma.privacy.update({
            where: {
                id: body.id,
            },
            data: {
                title: body?.title,
                descr: body?.descr,
                title_ru: body.title_ru,
                descr_ru: body.descr_ru,
            },
        })

        // const allQuestions = await prisma.question.findMany({
        //     orderBy: {
        //         order: "asc",
        //     },
        // })

        // await updateModelOrder({
        //     modelsToReorder: allQuestions,
        //     newItem: newQuestion,
        //     newOrder: body?.order,
        //     modelName: "question",
        // })

        res.status(200).json({ msg: "good", data: newPolicy })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default async function handler(req, res) {
    const requestMethod = req.method

    try {
        switch (requestMethod) {
            case "POST":
                await addQuestion(req, res)
                break
            case "GET":
                // await getAllQuestion(req, res)
                break
            case "PUT":
                await updateQuestion(req, res)
                break
            case "DELETE":
                // await deleteItemById(req, res)
                break
            default:
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
