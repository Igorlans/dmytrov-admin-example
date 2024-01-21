import prisma from "@/prisma/client";

export const updateModelOrder = async ({
    newItem,
    newOrder,
    isUpdate,
    modelsToReorder,
    modelName,
}) => {
    try {
        const newModelIndex = Number(newOrder) - 1;

        console.log("newModelIndex =====", newModelIndex);

        const isOrderEntered =
            !isNaN(newModelIndex) &&
            newModelIndex >= 0 &&
            newModelIndex <= modelsToReorder?.length;

        console.log("isOrderEntered =====", isOrderEntered);

        const newOrderArray = [...modelsToReorder].filter(
            (item) => item.id !== newItem.id
        );

        newOrderArray.splice(newModelIndex, 0, newItem);

        const newModelsOrder = isOrderEntered ? newOrderArray : modelsToReorder;

        const updatePromises = newModelsOrder?.map((model, index) => {
            const modelId = model?.id;
            const newOrder = index + 1;
            console.log("title", model?.title);
            return prisma[modelName].update({
                where: { id: modelId },
                data: { order: newOrder },
            });
        });

        await prisma.$transaction(updatePromises);

        console.log("Questions order updated successfully");
    } catch (error) {
        throw error;
    }
};
