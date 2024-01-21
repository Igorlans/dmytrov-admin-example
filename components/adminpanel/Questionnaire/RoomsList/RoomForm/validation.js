import { z } from "zod";

export const questionaryRoomSchema = z.object({
    name: z.string().min(1, "Поле обов'язкове"),
    imageUrl: z.string().url("Введіть URL").min(1, "Поле обов'язкове"),
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
