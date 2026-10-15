import { Router } from "express";
import { docsRouter } from "./docs/docs.routes.js";
import { healthRouter } from "./modules/health/health.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { taskRouter } from "./modules/task/task.routes.js";

export const apiRouter = Router();

apiRouter.use("/docs", docsRouter);
apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", taskRouter);
