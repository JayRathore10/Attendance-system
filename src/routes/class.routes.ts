import { Router } from "express";
import { authVerfication } from "../middleware/auth.middleware";
import { addStudent, createClass, getClass } from "../controllers/class.controller";

export const classRouter = Router();

classRouter.post("/" , authVerfication , createClass );
classRouter.post("/:id/add-student" , authVerfication , addStudent);
classRouter.get("/:id" , authVerfication ,getClass );