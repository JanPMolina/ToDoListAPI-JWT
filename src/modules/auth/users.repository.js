import { unwrap } from "../../lib/supabase.js";

// Acceso a la tabla users: igual que en task, es el único archivo del módulo que conoce Supabase.
const TABLE_NAME = "users";

export function createUsersRepository(supabase) {
    return {
        async findByEmail(email) {
            return unwrap(
                await supabase.from(TABLE_NAME).select("id, email, password_hash").eq("email", email).maybeSingle()
            );
        },

        async create({ email, passwordHash }) {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .insert({ email, password_hash: passwordHash })
                    .select("id, email, created_at")
                    .single()
            );
        },
    };
}
