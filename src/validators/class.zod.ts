import {z} from "zod";

export const validClassNameSchema = z.object({
  className : z.string().min(1 , "class name is required") 
});
