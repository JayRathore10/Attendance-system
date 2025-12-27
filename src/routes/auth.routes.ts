import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup" , signUp);

