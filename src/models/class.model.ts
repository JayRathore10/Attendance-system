import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className : {
    type : String  , 
    required : true
  } , 
  teacherId : {
    type : mongoose.Schema.Types.ObjectId , 
    required : true 
  }, 
  studentId : {
    type : [mongoose.Schema.Types.ObjectId] , 
    required : true
  }
})

export const classModel = mongoose.model("class" , classSchema);

