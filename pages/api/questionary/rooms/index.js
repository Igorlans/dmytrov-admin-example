import prisma from "@/prisma/client";
import { updateModelOrder } from "@/utils/updateModelOrder";

const createRoom = async (req, res) => {
    const body = req.body;

    try {
        let newRoom = await prisma.room.create({
            data: {
                name: body.name,
                isActive: body.isActive,
                image: body.image,
            },
        });

        const rooms = await prisma.room.findMany({
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: rooms,
            newItem: newRoom,
            newOrder: body?.order,
            modelName: "room",
        });

        res.status(200).json({ message: "good", data: newRoom });
    } catch (error) {
        throw error;
    }
};

const updateRoom = async (req, res) => {
    const body = req.body;

    try {
        let newRoom = await prisma.room.update({
            where: {
                id: body.id,
            },
            data: {
                name: body.name,
                isActive: body.isActive,
                image: body.image,
            },
        });

        const rooms = await prisma.room.findMany({
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: rooms,
            newItem: newRoom,
            newOrder: body?.order,
            modelName: "room",
        });

        res.status(200).json({ message: "good", data: newRoom });
    } catch (error) {
        throw error;
    }
};

const deleteRoom = async (req, res) => {
    const body = req.query;
    try {
        const deletedRoom = await prisma.room.delete({
            where: {
                id: body.id,
            },
        });

        res.status(200).json({ msg: "good", data: deletedRoom });
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    const requestMethod = req.method;

    try {
        switch (requestMethod) {
            case "POST":
                await createRoom(req, res);
                break;
            case "PUT":
                await updateRoom(req, res);
                break;
            case "DELETE":
                await deleteRoom(req, res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
