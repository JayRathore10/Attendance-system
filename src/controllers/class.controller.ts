import { Response } from "express";
import { validClassNameSchema } from '../validators/class.zod';
import { authRequest } from "../types/authRequest";
import { success } from "zod";
import { classModel } from "../models/class.model";

export const createClass = async(req : authRequest, res :Response)=>{
  try{  

    if(!req.user){
      return res.status(401).json({
        success : false ,
      });
    }

    if(req.user.role  !== "teacher"){
      return res.status(403).json({
        success : false  , 
        message : "Only Teacher can create class"
      }) ;
    }

    const validClassName = validClassNameSchema.safeParse(req.body);

    if(!validClassName.success){
      return res.status(400).json({
        success : false , 
        error : validClassName.error.flatten().fieldErrors 
      });
    }

    const newClass = await classModel.create({
      className: validClassName.data.className , 
      teacherId : req.user._id , 
      studentIds : []
    });

    return res.status(200).json({
      success : true , 
      data : {
        _id : newClass._id, 
        className : newClass.className ,
        teacherId : newClass.teacherId , 
        studentIds : newClass.studentIds 
      }
    });
  }catch(err){
    return res.status(500).json({
      success : false , 
      message : "Server Fail"
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