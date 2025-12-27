import { Router } from "express";
import { login, signUp, test } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup" , signUp);
authRouter.post("/login" , login );
authRouter.post("/test" , test);

