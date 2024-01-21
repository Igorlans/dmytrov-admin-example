import prisma from "@/prisma/client"
import { updateModelOrder } from "@/utils/updateModelOrder"
import { slugify } from "@/utils/slugify"

const getAllServices = async (req, res) => {
    const body = req.query
    try {
        const data = await prisma.Services.findMany({
            orderBy: { order: "asc" },
        })
        res.status(200).json({ msg: "good", data: data })
    } catch (error) {
        throw error
    }
}

async function deleteItemById(req, res) {
    const id = req.query.id
    console.log(id, "adsifdsf")
    try {
        const deletedItem = await prisma.services.delete({
            where: {
                id,
            },
        })

        await prisma.seo.delete({
            where: {
                page: `/additional/${deletedItem.slug}`,
            },
        })

        return res.status(200).json({ data: deletedItem })
    } catch (error) {
        throw error
    }
}

const addService = async (req, res) => {
    const body = req.body
    try {
        const slug = slugify(body.title)

        const newService = await prisma.services.create({
            data: {
                title: body.title,
                title_ru: body.title_ru,
                descr: body.descr,
                descr_ru: body.descr_ru,
                price: body.price,
                label: body.label,
                image: body?.image,
                content: body?.content,
                slug,
            },
        })

        const services = await prisma.services.findMany({
            orderBy: {
                order: "asc",
            },
        })

        await prisma.seo.create({
            data: {
                page: `/additional/${slug}`,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.descr || " ",
                description_ru: body?.descr_ru,
                keywords: "",
                seoTitle: body?.title,
                seoTitle_ru: body?.title_ru,
                seoText: body?.descr || " ",
                seoText_ru: body?.descr_ru,
                edited: false,
                hideSeoText: true,
            },
        })

        await updateModelOrder({
            modelsToReorder: services,
            newItem: newService,
            newOrder: body?.order,
            modelName: "services",
        })

        res.status(200).json({ msg: "good", data: newService })
    } catch (error) {
        throw error
    }
}

const updateService = async (req, res) => {
    const body = req.body
    try {
        const oldService = await prisma.services.findUnique({
            where: {
                id: body.id,
            },
        })

        const slug = slugify(body.title)

        const data = await prisma.services.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                title_ru: body.title_ru,
                descr: body.descr,
                descr_ru: body.descr_ru,
                price: body.price,
                label: body.label,
                image: body?.image,
                content: body?.content,
                slug,
            },
        })

        const services = await prisma.services.findMany({
            orderBy: {
                order: "asc",
            },
        })

        await prisma.seo.upsert({
            where: {
                page: `/additional/${oldService.slug}`,
            },
            create: {
                page: `/additional/${slug}`,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.descr || " ",
                description_ru: body?.descr_ru,
                keywords: "",
                seoTitle: body?.title,
                seoTitle_ru: body?.title_ru,
                seoText: body?.descr || " ",
                seoText_ru: body?.descr_ru,
                edited: false,
                hideSeoText: true,
            },
            update: {
                page: `/additional/${slug}`,
                edited: false,
            },
        })

        await updateModelOrder({
            modelsToReorder: services,
            newItem: data,
            newOrder: body?.order,
            modelName: "services",
        })

        res.status(200).json({ msg: "good", data: data })
    } catch (error) {
        throw error
    }
}

export default async function handler(req, res) {
    const requestMethod = req.method

    try {
        switch (requestMethod) {
            case "POST":
                await addService(req, res)
                break
            case "GET":
                await getAllServices(req, res)
                break
            case "PUT":
                await updateService(req, res)
                break
            case "DELETE":
                await deleteItemById(req, res)
                break
            default:
                res.status(200).json({ msg: "not valid" })
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error", error: error })
    }
}
