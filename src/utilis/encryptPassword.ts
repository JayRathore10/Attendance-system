import bcrypt from "bcrypt";

export const encryptPassword = async (password : string)=>{
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(password , salt);

    return hashedpassword;
  }catch(err){
    console.error("Error in Hashing password" , err);
    throw new Error("Password Hashing Failed");
  }
}