import { Request, Response } from "express";
import { authRequest } from "../types/authRequest";
import { userModel } from "../models/user.model";
import { success } from "zod";

export const getAllStudent = async (req: authRequest, res: Response) => {
  try {
    const students = await userModel.find();

    if(students.length == 0){
      return res.status(404).json({
        success : false, 
        message : "Student Not Found"
      });
    }

    return res.status(200).json({
      success : true , 
      data : students
    });

  } catch (err : any) {
    if (err.error === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.errors
      })
    }

    return res.status(400).json({
      success: false,
      message: "Server Error"
    })
  }
} 