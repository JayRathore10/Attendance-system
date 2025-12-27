import { Router } from "express";
import { signUp, test } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup" , signUp);
authRouter.post("/test" , test);

