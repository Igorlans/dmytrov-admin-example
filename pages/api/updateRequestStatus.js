import prisma from "@/prisma/client";

const updateStatus = async (req, res) => {
    try {
        const body = req.body;
        console.log("BODY ========= ", body);
        if (!body) return res.status(400).json({ message: "Не вказані дані" });
        const updatedRequest = await prisma.request.update({
            where: {
                id: body.id,
            },
            data: {
                status: body.status,
                date: body.date,
                adminComment: body.adminComment,
            },
            include: {
                User: true,
            },
        });
        return res.status(201).json({ message: "good", data: updatedRequest });
    } catch (e) {
        throw e;
    }
};

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "PUT":
                await updateStatus(req, res);
                break;
            default:
                throw new Error("Unsupported request method");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
}
