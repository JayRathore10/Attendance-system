import { JwtPayload } from "jsonwebtoken";
import { Request } from "express"
import { User } from '../models/user.model';

export interface userPlayload extends JwtPayload{
  userId : any ,
  email : string 
};

export interface authRequest extends Request{
  user ?: User
}
