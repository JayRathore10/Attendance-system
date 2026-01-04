import { Router } from "express";
import { authVerfication } from "../middleware/auth.middleware";
import { getAllStudent } from "../controllers/students.controller";

export const studentRouter = Router();

studentRouter.get("/" , authVerfication, getAllStudent );