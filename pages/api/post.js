import prisma from "@/prisma/client"
import { slugify } from "@/utils/slugify"

const createPost = async (req, res) => {
    try {
        const body = req.body
        const slug = slugify(body.title)
        const newPost = await prisma.post.create({
            data: {
                image: body.image,
                createdAt: String(Date.now()),
                content: body.content,
                description: body.description,
                title: body.title,
                title_ru: body?.title_ru,
                description_ru: body?.description_ru,
                slug,
            },
        })

        await prisma.seo.create({
            data: {
                page: `/blog/${slug}`,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.description || " ",
                description_ru: body?.description_ru,
                keywords: "",
                seoTitle: body?.title,
                seoTitle_ru: body?.title_ru,
                seoText: body?.description || " ",
                seoText_ru: body?.description_ru,
                edited: false,
                hideSeoText: true,
            },
        })

        res.status(200).json({ message: "good", data: newPost })
    } catch (error) {
        throw error
    }
}

const updatePost = async (req, res) => {
    try {
        const body = req.body
        const slug = slugify(body.title)

        const oldPost = await prisma.post.findUnique({
            where: {
                id: body.id,
            },
        })

        const newPost = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                image: body.image,
                createdAt: String(Date.now()),
                content: body?.content,
                description: body?.description,
                title: body?.title,
                title_ru: body?.title_ru,
                description_ru: body?.description_ru,
                slug,
            },
        })

        await prisma.seo.upsert({
            where: {
                page: `/blog/${oldPost.slug}`,
            },
            create: {
                page: `/blog/${slug}`,
                title: body?.title,
                title_ru: body?.title_ru,
                description: body?.description || " ",
                description_ru: body?.description_ru,
                keywords: "",
                seoTitle: body?.title,
                seoTitle_ru: body?.title_ru,
                seoText: body?.description || " ",
                seoText_ru: body?.description_ru,
                edited: false,
                hideSeoText: true,
            },
            update: {
                page: `/blog/${slug}`,
                edited: false,
            },
        })

        res.status(200).json({ message: "good", data: newPost })
    } catch (error) {
        throw error
    }
}

const deletePost = async (req, res) => {
    const body = req.query
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: body.id,
            },
        })

        await prisma.seo.delete({
            where: {
                page: `/blog/${deletedPost.slug}`,
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
                await createPost(req, res)
                break
            case "PUT":
                await updatePost(req, res)
                break
            case "DELETE":
                await deletePost(req, res)
                break
            default:
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
