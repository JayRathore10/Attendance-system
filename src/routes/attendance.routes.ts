import { Router } from "express";
import { authVerfication } from "../middleware/auth.middleware";
import { attendanceStart } from "../controllers/attendance.controller";

export const attendanceRouter = Router();

attendanceRouter.post("/start" , authVerfication , attendanceStart);
