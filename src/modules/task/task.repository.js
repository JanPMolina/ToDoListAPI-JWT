import { unwrap } from "../../lib/supabase.js";

// Capa de acceso a datos: es el ÚNICO archivo del módulo que conoce Supabase.
// Recibe el cliente por parámetro (inyección de dependencias): en los tests se puede pasar uno falso.
const TABLE_NAME = "tasks";
const TABLE_COLUMNS = "id, title, description, done, created_at";

export function createTaskRepository(supabase) {
    return {
        async findAll() {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .select(TABLE_COLUMNS)
                    .order("created_at", { ascending: false })
            );
        },

        async findById(id) {
            return unwrap(await supabase.from(TABLE_NAME).select(TABLE_COLUMNS).eq("id", id).maybeSingle());
        },

        async create(task) {
            return unwrap(await supabase.from(TABLE_NAME).insert(task).select(TABLE_COLUMNS).single());
        },

        async update(id, changes) {
            return unwrap(
                await supabase.from(TABLE_NAME).update(changes).eq("id", id).select(TABLE_COLUMNS).maybeSingle()
            );
        },

        async remove(id) {
            const deleted = unwrap(await supabase.from(TABLE_NAME).delete().eq("id", id).select("id").maybeSingle());
            return deleted !== null;
        },
    };
}
