import { z } from "zod";

export const questionaryTableOptionSchema = z.object({
    text: z.string().min(1, "Поле обов'язкове"),
    articleUrl: z
        .string({ coerce: true })
        .url({ message: "Введіть URL" })
        .optional()
        .or(z.literal("")),

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
