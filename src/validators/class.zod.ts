import {z} from "zod";

export const validClassNameSchema = z.object({
  className : z.string().min(1 , "class name is required") 
});

export const validClassIdSchema = z.object({
  classId : z.string().regex(/^[0-9a-fA-F]{24}$/ , "Invalid ClassId") ,
})

export const validStudentSchema = z.object({
  studentId : z.string().regex(/^[0-9a-fA-F]{24}$/ , "Invalid StudentId")
})