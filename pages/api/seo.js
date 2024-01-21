import prisma from "@/prisma/client"

const createSeo = async (req, res) => {
    try {
        const body = req.body
        const newSeo = await prisma.seo.create({
            data: {
                page: body?.page,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.description,
                description_ru: body?.description_ru,
                keywords: body?.keywords,
                seoTitle: body?.seoTitle,
                seoTitle_ru: body?.seoTitle_ru,
                seoText: body?.seoText,
                seoText_ru: body?.seoText_ru,
                hideSeoText: body?.hideSeoText,
            },
        })

        res.status(200).json({ message: "good", data: newSeo })
    } catch (error) {
        throw error
    }
}

const updateSeo = async (req, res) => {
    try {
        const body = req.body

        const newSeo = await prisma.seo.update({
            where: {
                id: body?.id,
            },
            data: {
                page: body?.page,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.description,
                description_ru: body?.description_ru,
                keywords: body?.keywords,
                seoTitle: body?.seoTitle,
                seoTitle_ru: body?.seoTitle_ru,
                seoText: body?.seoText,
                seoText_ru: body?.seoText_ru,
                edited: true,
                hideSeoText: body?.hideSeoText,
            },
        })

        res.status(200).json({ message: "good", data: newSeo })
    } catch (error) {
        throw error
    }
}

const deleteSeo = async (req, res) => {
    const body = req.query
    try {
        const deletedPost = await prisma.seo.delete({
            where: {
                id: body.id,
            },
        })

        res.status(200).json({ msg: "good", data: deletedPost })
    } catch (error) {
        throw error
    }
}

export default async function handler(req, res) {
    const requestMethod = req.method

    try {
        switch (requestMethod) {
            case "POST":
                await createSeo(req, res)
                break
            case "PUT":
                await updateSeo(req, res)
                break
            case "DELETE":
                await deleteSeo(req, res)
                break
            default:
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
