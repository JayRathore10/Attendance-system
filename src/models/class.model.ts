import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className : {
    type : String  , 
    required : true
  } , 
  teacherId : {
    type : mongoose.Schema.Types.ObjectId , 
    ref : "User" , 
    required : true
  }, 
  studentIds : { 
    type : [mongoose.Schema.Types.ObjectId] , 
    ref : "User" , 
    default : []
  }
})

export const classModel = mongoose.model("class" , classSchema);

