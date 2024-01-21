import prisma from "@/prisma/client";
import { updateModelOrder } from "@/utils/updateModelOrder";

const createOption = async (req, res) => {
    try {
        const body = req.body;

        const newTableOption = await prisma.tableOption.create({
            data: {
                text: body.text,
                articleUrl: body.articleUrl,
                image: body?.image,
                isActive: body.isActive,
                tableId: body?.tableId,
                roomTableId: body?.roomTableId,
            },
        });

        console.log("ROOMTABLE ID ========", body?.roomTableId);
        console.log("TABLE ID ========", body?.tableId);

        const allOptions = await prisma.tableOption.findMany({
            where: {
                OR: [
                    {
                        tableId: body?.tableId || undefined,
                    },
                    {
                        roomTableId: body?.roomTableId || undefined,
                    },
                ],
            },
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allOptions,
            newItem: newTableOption,
            newOrder: body?.order,
            modelName: "tableOption",
        });

        res.status(200).json({ message: "good", data: newTableOption });
    } catch (error) {
        throw error;
    }
};

const updateOption = async (req, res) => {
    try {
        const body = req.body;

        const newTableOption = await prisma.tableOption.update({
            where: {
                id: body.id,
            },
            data: {
                text: body.text,
                articleUrl: body.articleUrl,
                isActive: body.isActive,
                image: body?.image,
            },
        });

        console.log("ROOMTABLE ID ========", body?.roomTableId);
        console.log("TABLE ID ========", body?.tableId);

        const allOptions = await prisma.tableOption.findMany({
            where: {
                OR: [
                    {
                        tableId: body?.tableId || undefined,
                    },
                    {
                        roomTableId: body?.roomTableId || undefined,
                    },
                ],
            },
            orderBy: {
                order: "asc",
            },
        });

        await updateModelOrder({
            modelsToReorder: allOptions,
            newItem: newTableOption,
            newOrder: body?.order,
            modelName: "tableOption",
        });

        res.status(200).json({ message: "good", data: newTableOption });
    } catch (error) {
        throw error;
    }
};

const deleteOption = async (req, res) => {
    const body = req.query;

    try {
        const deletedTableOption = await prisma.tableOption.delete({
            where: {
                id: body.id,
            },
        });

        res.status(200).json({ msg: "good", data: deletedTableOption });
    } catch (error) {
        throw error;
    }
};

export default async function handler(req, res) {
    const requestMethod = req.method;

    try {
        switch (requestMethod) {
            case "POST":
                await createOption(req, res);
                break;
            case "PUT":
                await updateOption(req, res);
                break;
            case "DELETE":
                await deleteOption(req, res);
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
