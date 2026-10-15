import { HttpError } from "../../utils/http-error.js";

// Reglas de negocio. No sabe de Express ni de Supabase: solo usa el repositorio.
export function createTaskService(taskRepository) {
    return {
        list: () => taskRepository.findAll(),

        async getById(id) {
            const task = await taskRepository.findById(id);
            if (!task) throw HttpError.notFound(`La tarea ${id} no existe`);
            return task;
        },

        create: (data) => taskRepository.create(data),

        async update(id, changes) {
            const task = await taskRepository.update(id, changes);
            if (!task) throw HttpError.notFound(`La tarea ${id} no existe`);
            return task;
        },

        async remove(id) {
            const removed = await taskRepository.remove(id);
            if (!removed) throw HttpError.notFound(`La tarea ${id} no existe`);
        },
    };
}
