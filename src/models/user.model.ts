import mongoose , {InferSchemaType, HydratedDocument, HydratedSingleSubdocument} from "mongoose";

const userSchema = new mongoose.Schema({
  name : {
    type : String  , 
    required : true 
  } , 
  email : {
    type : String , 
    required : true
  } , 
  password : {
    type : String , 
    required : true 
  }, 
  role :  {
    type : String , 
    enum : ["teacher" , "student"], 
    required : true 
  }
}); 

export type User = HydratedDocument<InferSchemaType<typeof userSchema>>;

export const userModel = mongoose.model<User>( "User" , userSchema);