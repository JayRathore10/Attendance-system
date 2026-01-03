import {Request , Response , NextFunction} from 'express';
import jwt from "jsonwebtoken";
import { userModel } from '../models/user.model';
import { authRequest, userPlayload } from '../types/authRequest';

export const authVerfication = async(req : authRequest , res : Response , next : NextFunction)=>{
  try{
    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        success : false , 
        message : "Login First" 
      });
    }
    
    const JWT_SECRET = process.env.JWT_SECRET as string;

    if(!JWT_SECRET){
      return res.status(500).json({
        success : false, 
        message : "Internal Error"
      })
    }

    const decodedData = jwt.verify(token , JWT_SECRET) as userPlayload;

    const user = await userModel.findOne({
      email : decodedData.email
    }).select("-password");

    if(!user){
      return res.status(401).json({
        success : false , 
        message : "User Not Found"
      });
    }

    req.user = user ;
    next();
  }catch(err){
    return res.status(500).json({
      success : false , 
      message : "Server Error"
    })
  }
}