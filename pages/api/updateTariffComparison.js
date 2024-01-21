import prisma from "@/prisma/client"

const updateTariffComparison = async (req, res) => {
    try {
        const body = req.body
        console.log("BODY ========= ", body)
        if (!body) return res.status(400).json({ message: "Не вказані дані" })
        const updatedTariffComparison = await prisma.tariffComparison.upsert({
            where: {
                id: "clhkcfohv000007xdwjd9wdew",
            },
            update: {
                table: body,
            },
            create: {
                table: body,
            },
        })
        return res
            .status(201)
            .json({ message: "good", data: updatedTariffComparison })
    } catch (e) {
        throw e
    }
}

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "PUT":
                await updateTariffComparison(req, res)
                break
            default:
                throw new Error("Unsupported request method")
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: e.message })
    }
}
