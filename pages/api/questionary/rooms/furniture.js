import prisma from "@/prisma/client";
import { updateModelOrder } from "@/utils/updateModelOrder";

const createFurniture = async (req, res) => {
    const body = req.body;

    try {
        let newFurniture = await prisma.roomFurniture.create({
            data: {
                name: body.name,
                isActive: body.isActive,
                hint: body.hint,
                articleUrl: body.articleUrl,
                image: body.image || {},
                roomId: body.roomId,
            },
        });

        const allFurniture = await prisma.roomFurniture.findMany({
            where: {
                roomId: body?.roomId,
            },
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allFurniture,
            newItem: newFurniture,
            newOrder: body?.order,
            modelName: "roomFurniture",
        });

        res.status(200).json({ message: "good", data: newFurniture });
    } catch (error) {
        throw error;
    }
};

const updateFurniture = async (req, res) => {
    const body = req.body;

    try {
        let newFurniture = await prisma.roomFurniture.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                articleUrl: body.articleUrl,
                hint: body.hint,
                isActive: body.isActive,
                image: body.image || {},
            },
        });

        const allFurniture = await prisma.roomFurniture.findMany({
            where: {
                roomId: body?.roomId,
            },
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allFurniture,
            newItem: newFurniture,
            newOrder: body?.order,
            modelName: "roomFurniture",
        });

        res.status(200).json({ message: "good", data: newFurniture });
    } catch (error) {
        throw error;
    }
};

const deleteFurniture = async (req, res) => {
    const body = req.query;
    try {
        const deletedFurniture = await prisma.roomFurniture.delete({
            where: {
                id: body.id,
            },
        });

        res.status(200).json({ msg: "good", data: deletedFurniture });
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    const requestMethod = req.method;

    try {
        switch (requestMethod) {
            case "POST":
                await createFurniture(req, res);
                break;
            case "PUT":
                await updateFurniture(req, res);
                break;
            case "DELETE":
                await deleteFurniture(req, res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
