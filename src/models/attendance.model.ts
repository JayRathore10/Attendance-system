import mongoose, { ModifiedPathsSnapshot } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  classId:{
    type : mongoose.Schema.Types.ObjectId , 
    required : true 
  }, 
  studentId: {
    type : mongoose.Schema.Types.ObjectId , 
    required: true 
  } ,
  status : {
    type : String , 
    enum : ["present" , "absent"], 
    required : true 
  }
})

export const attendanceModel = mongoose.model("attendance" , attendanceSchema);
