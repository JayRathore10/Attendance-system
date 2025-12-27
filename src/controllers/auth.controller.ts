import { Request , Response } from "express";
import { createUserSchema } from "../validators/user.zod";
import { userModel } from "../models/user.model";


export const signUp = async (req : Request , res : Response )=>{
  try{
    const validateData = createUserSchema.parse(req.body);

    const isAlreadyUser = await userModel.find(req.body.email);

    if(isAlreadyUser){
      return res.status(400).json({
        success : false , 
        error : "Email Already Exists"
      });
    }

    const user = await userModel.create(validateData);

    return res.status(201).json({
      success : true , 
      data : {
        _id : user._id , 
        name : user.name , 
        email : user.email , 
        role : user.role
      }
    })

  }catch(err : any){
    if(err.name === "ZodError"){
      return res.status(400).json({
        success : false , 
        message : "Validation Error"  , 
        errors : err.errors
      });
    }

    return res.status(500).json({
      success : false , 
      message : "Server Error" , 
    });
  }
}