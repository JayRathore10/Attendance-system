import { Router } from "express";
import { authVerfication } from "../middleware/auth.middleware";
import { addStudent, createClass, getClass, myAttendance } from "../controllers/class.controller";

export const classRouter = Router();

// Create class 
classRouter.post("/" , authVerfication , createClass );

//  Add Student to a class 
classRouter.post("/:id/add-student" , authVerfication , addStudent);

//  Get class Details 
classRouter.get("/:id" , authVerfication ,getClass );

// Get Student Attendance for a class
classRouter.get("/:id/my-attendance" , authVerfication, myAttendance);