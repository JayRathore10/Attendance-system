import {z} from "zod";

export const createUserSchema = z.object({
  name : z.string().min(3 , "Name must be 3 character long") ,
  email : z.string().email("Invalid Email") , 
  password : z.string().min(6) ,
  role : z.enum(["teacher" , "student"])
}); 

export const findUserSchema = z.object({
  email : z.string().email("Invalid Email") ,
  password : z.string().min(6)
});
