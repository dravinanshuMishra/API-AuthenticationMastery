import userModel from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

const registerUser = async(name: string, email:string, password: string) => {
  console.log("register", name, email, password);

  // step 1. DB call for save user.
  const user = await userModel.findOne({email: email})
  if(user) {
    const error  = createHttpError(400,"User already exists");
    return error;
  }

  // step: 2. password hased.
  const hasedPassword = await bcrypt.hash(password,10);

  // later: yaha mongoose model ka use karke DB save karoge, business logic likho yaha pr.
  return { name, email, password: hasedPassword }; 
};

export { registerUser };
