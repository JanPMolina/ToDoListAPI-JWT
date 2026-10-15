import { Router } from "express";
import { supabase } from "../../lib/supabase.js";
import { validate } from "../../middlewares/validate.js";
import { requireAuth } from "../../middlewares/auth.js";
import { createUsersRepository } from "./users.repository.js";
import { createAuthService } from "./auth.service.js";
import { createAuthController } from "./auth.controller.js";
import { credentialsSchema } from "./auth.schema.js";

// Composition root del módulo: repository -> service -> controller.
const usersRepository = createUsersRepository(supabase);
const authService = createAuthService(usersRepository);
const authController = createAuthController(authService);

export const authRouter = Router();

authRouter.post("/register", validate(credentialsSchema), authController.register);
authRouter.post("/login", validate(credentialsSchema), authController.login);
authRouter.get("/me", requireAuth, authController.me);
