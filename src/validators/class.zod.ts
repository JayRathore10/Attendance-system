import {z} from "zod";

export const validClassNameSchema = z.object({
  className : z.string().min(1 , "class name is required") 
});

export const validStudentSchema = z.object({
  classId : z.string().regex(/^[0-9a-fA-F]{24}$/ , "Invalid ClassId") ,
  studentId : z.string().regex(/^[0-9a-fA-F]{24}$/ , "Invalid studentId")
})