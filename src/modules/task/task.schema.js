import { z } from "zod";

// Schemas que usa el middleware validate para revisar la entrada.
export const taskIdParams = z.object({
    id: z.coerce.number().int().positive(),
});

export const createTaskSchema = z.object({
    title: z.string().trim().min(1).max(200),
    description: z.string().trim().max(2000).optional(),
    done: z.boolean().optional(),
});

export const updateTaskSchema = createTaskSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, { message: "Debe enviar al menos un campo" });
