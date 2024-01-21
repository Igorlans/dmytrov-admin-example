import { z } from "zod";

export const questionaryRoomTableSchema = z.object({
    text: z.string().min(1, "Поле обов'язкове"),
    type: z.string().array().min(1, "Виберіть хоча б один тип"),
    tariffes: z.string().array().min(1, "Виберіть хоча б один тариф"),
    order: z.coerce
        .number({ invalid_type_error: "Введіть число" })
        .optional()
        .refine(
            (value) => {
                console.log("zod", value);
                if (String(value) === "0") return true;
                return value > 0;
            },
            {
                message: "Мінімальне число - 1",
            }
        ),
    isActive: z.boolean(),
});
