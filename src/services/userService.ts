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

  // step: 3. user create.
  const newUser = await userModel.create({
    name: name,
    email: email,
    password: hasedPassword
  });
  console.log("newUser", newUser);

  // step: 4. user save.
  await newUser.save();

  // step: 5. token create.


  // step: last. response return.
  return { newUser };
};

export { registerUser };
