import { Response } from "express";
import { validClassNameSchema, validStudentSchema } from '../validators/class.zod';
import { authRequest } from "../types/authRequest";
import { success } from "zod";
import { classModel } from "../models/class.model";
import { userModel } from "../models/user.model";

export const createClass = async (req: authRequest, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
      });
    }

    if (req.user.role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Only Teacher can create class"
      });
    }

    const validClassName = validClassNameSchema.safeParse(req.body);

    if (!validClassName.success) {
      return res.status(400).json({
        success: false,
        error: validClassName.error.flatten().fieldErrors
      });
    }

    const newClass = await classModel.create({
      className: validClassName.data.className,
      teacherId: req.user._id,
      studentIds: []
    });

    return res.status(200).json({
      success: true,
      data: {
        _id: newClass._id,
        className: newClass.className,
        teacherId: newClass.teacherId,
        studentIds: newClass.studentIds
      }
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

export const addStudent = async (req: authRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false
      });
    }

    if (req.user.role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Only teacher can present the student"
      });
    }

    const validStudentName = validStudentSchema.safeParse(req.body);;

    if (!validStudentName.success) {
      return res.status(400).json({
        success: false,
        error: validStudentName.error.flatten().fieldErrors
      })
    }

    const { classId, studentId } = validStudentName.data;

    const classData = await classModel.findOne({
      _id: classId,
      teacherId: req.user._id
    });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    const student = await userModel.findOne({
      _id: studentId,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    const updateClass = await classModel.findByIdAndUpdate(
      classId,
      {
        $addToSet: { studentIds: studentId }
      },
      { new: true }
    )

    if (!updateClass) {
      return res.status(401).json({
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      data: {
        _id: updateClass._id,
        teacherId: req.user._id,
        studentIds: updateClass.studentIds
      }
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

/**
 * 
 * Add /class 
 * Add all the class routes and their functionality 
 *
 * 
 */