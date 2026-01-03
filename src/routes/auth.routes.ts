import { Router } from "express";
import { authMe, login, signUp, test } from "../controllers/auth.controller";
import { authVerfication } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/signup" , signUp);
authRouter.post("/login" , login );
authRouter.post("/test" , test);
authRouter.get("/me" , authVerfication , authMe );

