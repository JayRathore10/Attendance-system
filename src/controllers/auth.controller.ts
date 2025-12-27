import { Request , Response } from "express";
import { createUserSchema, findUserSchema } from "../validators/user.zod";
import { userModel } from "../models/user.model";
import { encryptPassword } from "../utilis/encryptPassword";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// testing API function
export const test = (req : Request  , res : Response )=>{
  try{

    const  a = req.body.a;

    return res.status(201).json({
      a , 
      sucess : true
    })
  }catch(err){
    return res.status(500).json({
      success : false 
    })
  }
}

export const signUp = async (req : Request , res : Response )=>{
  try{
    // validation of  req.body 
    const validateData = createUserSchema.parse(req.body);

    const isAlreadyUser = await userModel.findOne({email : req.body.email});

    if(isAlreadyUser){
      return res.status(400).json({
        success : false , 
        error : "Email Already Exists"
      });
    }

    const hashedPassword = await encryptPassword(req.body.password);

    validateData.password = hashedPassword;

    const user = await userModel.create(validateData);

    const playload = {
      userId : user._id , 
      role : user.role
    }

    const JWT_SECRET = process.env.JWT_SECRET as string;

    if(!JWT_SECRET){
      return res.status(400).json({
        success : false, 
        message : "JWT_SECRET not define"
      })
    }

    const token = jwt.sign(playload, JWT_SECRET);
    res.cookie("token" , token);

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

export const login = async(req : Request  , res : Response)=>{
  try{
    // validation of email and password ;
    const validData = findUserSchema.parse(req.body);
    
    const user = await userModel.findOne({email : req.body.email});

    if(!user){
      return res.status(400).json({
        success : false , 
        message : "User is not found"
      })
    }

    const result = await bcrypt.compare(req.body.password , user.password);

    if(!result){
      return res.status(400).json({
        success : false , 
        message : "Password is Incorrect" 
      })
    }

    return res.status(200).json({
      success : true , 
      data : `JWT_TOKEN`
    })

  }catch(err : any){
    if(err.error === "ZodError"){
      return res.status(400).json({
        success : false ,
        message : "Validation Error" , 
        errors : err.errors
      })
    }

    return res.status(400).json({
      success : false , 
      message : "Server Error"
    })

  }
}