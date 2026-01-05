import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string ;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET missing");
}

export const authSocket = async(io : Server)=>{
  io.use((socket : any , next : any)=>{ 
    const token = socket.handshake.auth.token;
    if(!token) return next(new Error("Unauthorized"));

    try{
      const user = jwt.verify(token, JWT_SECRET); 
      socket.data.user = user;
      next();
    }catch{
      next (new Error ("Invalid token"));
    }
  });
}