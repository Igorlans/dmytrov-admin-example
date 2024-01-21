import prisma from "@/prisma/client"

const getAllTariffes = async (req, res) => {
    const body = req.query
    try {
        const data = await prisma.Tariffes.findMany({
            orderBy: { id: "asc" },
            where: {
                id: { in: [1, 2, 3] },
            },
            include: {
                TariffPlan: true,
            },
        })
        res.status(200).json({ msg: "good", data: data })
    } catch (error) {
        throw error
    }
}

const addTariff = async (req, res) => {
    const body = JSON.parse(req.body)
    try {
        const TariffPlan = {
            items: body.TariffPlan?.length ? body.TariffPlan : [],
        }

        await prisma.Tariffes.create({
            data: {
                id: body.id,
                title: body.title,
                title_ru: body?.title_ru,
                subTitle: body.subTitle,
                subTitle_ru: body.subTitle_ru,
                price: body.price,
                text: body.text,
                text_ru: body.text_ru,
                TariffPlan: TariffPlan,
                textMob: body.textMob,
                activated: body.activated,
                image: body.image,
            },
        })
        res.status(200).json({ msg: "good", data: body })
    } catch (error) {
        throw error
    }
}

const updateTariff = async (req, res) => {
    try {
        const body = req.body
        const TariffPlan = {
            items: body.TariffPlan?.length ? body.TariffPlan : [],
        }
        const data = await prisma.tariffes.update({
            where: {
                id: body.id,
            },
            data: {
                id: body.id,
                title: body.title,
                title_ru: body?.title_ru,
                subTitle: body.subTitle,
                subTitle_ru: body.subTitle_ru,
                price: body.price,
                text: body.text,
                text_ru: body.text_ru,
                TariffPlan: TariffPlan,
                activated: body.activated,
                image: body.image,
            },
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
                await addTariff(req, res)
                break
            case "GET":
                await getAllTariffes(req, res)
                break
            case "PUT":
                await updateTariff(req, res)
                break
            default:
                break
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "error", error: error })
    }
}
