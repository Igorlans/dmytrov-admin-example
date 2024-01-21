import prisma from "@/prisma/client";
import { updateModelOrder } from "@/utils/updateModelOrder";

const createTable = async (req, res) => {
    const body = req.body;

    const tariffQuery = body?.tariffes?.map((tariff) => ({ id: tariff }));

    try {
        let newTable = await prisma.questionaryRoomOptionTable.create({
            data: {
                text: body.text,
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

        newTable = {
            ...newTable,
            tariffes: newTable?.Tariffes?.map((tariff) => tariff?.id),
        };

        const questionaryRoomOptionTables =
            await prisma.questionaryRoomOptionTable.findMany({
                orderBy: {
                    order: "asc",
                },
            });

        await updateModelOrder({
            modelsToReorder: questionaryRoomOptionTables,
            newItem: newTable,
            newOrder: body?.order,
            modelName: "questionaryRoomOptionTable",
        });

        res.status(200).json({ message: "good", data: newTable });
    } catch (error) {
        throw error;
    }
};

const updateTable = async (req, res) => {
    try {
        const body = req.body;

        const tariffQuery = body?.tariffes?.map((tariff) => ({ id: tariff }));
        let newTable = await prisma.questionaryRoomOptionTable.update({
            where: {
                id: body.id,
            },
            data: {
                text: body.text,
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

        newTable = {
            ...newTable,
            tariffes: newTable?.Tariffes?.map((tariff) => tariff?.id),
        };

        const questionaryRoomOptionTables =
            await prisma.questionaryRoomOptionTable.findMany({
                orderBy: {
                    order: "asc",
                },
            });

        await updateModelOrder({
            modelsToReorder: questionaryRoomOptionTables,
            newItem: newTable,
            newOrder: body?.order,
            modelName: "questionaryRoomOptionTable",
        });

        res.status(200).json({ message: "good", data: newTable });
    } catch (error) {
        throw error;
    }
};

const deleteTable = async (req, res) => {
    const body = req.query;
    try {
        const deletedTable = await prisma.questionaryRoomOptionTable.delete({
            where: {
                id: body.id,
            },
        });

        res.status(200).json({ msg: "good", data: deletedTable });
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    const requestMethod = req.method;

    try {
        switch (requestMethod) {
            case "POST":
                await createTable(req, res);
                break;
            case "PUT":
                await updateTable(req, res);
                break;
            case "DELETE":
                await deleteTable(req, res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
