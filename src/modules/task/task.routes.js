import { Router } from "express";
import { supabase } from "../../lib/supabase.js";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { createTaskRepository } from "./task.repository.js";
import { createTaskService } from "./task.service.js";
import { createTaskController } from "./task.controller.js";
import { createTaskSchema, taskIdParams, updateTaskSchema } from "./task.schema.js";

// Composition root del módulo: aquí se arman las dependencias repository -> service -> controller.
const taskRepository = createTaskRepository(supabase);
const taskService = createTaskService(taskRepository);
const taskController = createTaskController(taskService);

export const taskRouter = Router();

taskRouter.use(requireAuth); // ← todas las rutas de tareas requieren token

taskRouter.get("/", taskController.list);
taskRouter.get("/:id", validate(taskIdParams, "params"), taskController.getById);
taskRouter.post("/", validate(createTaskSchema), taskController.create);
taskRouter.patch("/:id", validate(taskIdParams, "params"), validate(updateTaskSchema), taskController.update);
taskRouter.delete("/:id", validate(taskIdParams, "params"), taskController.remove);
