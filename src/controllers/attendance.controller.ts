import { Response } from "express";
import { authRequest } from "../types/authRequest";
import { startAttendanceSchema } from "../validators/startAttendance.zod";
import { classModel } from "../models/class.model";

// Store in memory 
let activeSession: {
  classId: string;
  startedAt: string;
  attendance: Record<string, boolean>;
} | null = null;

export const attendanceStart = async (req: authRequest, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({ success: false })
    }

    if (req.user.role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Only teacher can access"
      });
    }

    const parsed = startAttendanceSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(401).json({
        success: false,
        message: "class Id not valid",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    const { classId } = parsed.data;

    const classData = await classModel.findById({
      _id: classId,
      teacherId: req.user._id
    });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    // if Session is ready active 
    if (activeSession) {
      return res.status(400).json({
        success: false,
        message: "Another session is active"
      });
    }

    activeSession = {
      classId,
      startedAt: new Date().toISOString(),
      // first empty 
      // then filled when attendance taken 
      attendance: {},
    }

    return res.status(200).json({
      success: true,
      data: {
        classId,
        startedAt: activeSession.startedAt
      },
    });

  } catch (err : any ) {
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