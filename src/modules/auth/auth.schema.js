import { z } from "zod";

// Mismo schema para registro y login. El pipe normaliza el email antes de validar el formato,
// y como el pipe pierde el formato en la documentación, se lo devolvemos con .meta().
export const credentialsSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()).meta({ format: "email", example: "ana@test.com" }),
    password: z.string().min(8).max(72).meta({ example: "supersecreta" }),
});
