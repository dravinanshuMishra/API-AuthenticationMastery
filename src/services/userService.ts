import userModel from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const registerUser = async (name: string, email: string, password: string) => {
  console.log("register", name, email, password);

  // step 1. check if user already exists.
  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    throw createHttpError(400, "User already exists");
  }

  // step: 2. password hased.
  const hasedPassword = await bcrypt.hash(password, 10);

  // step: 3. user create.
  const newUser = await userModel.create({
    name: name,
    email: email,
    password: hasedPassword,
  });
  await newUser.save();

  // step: 4. token create (JWT - accessToken, refreshToken).
  const accessToken = jwt.sign(
    { userId: newUser._id },
    config.access_token_secret as string,
    { expiresIn: 3600 } // 1 hour
  );
  const refreshToken = jwt.sign(
    { userId: newUser._id },
    config.refresh_token_secret as string,
    { expiresIn: 7 * 24 * 60 * 60 } // 7 days
  );

  console.log({ accessToken, refreshToken, newUser });

  // step: 5. response return.
  return {
    accessToken,
    refreshToken,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  };
};

export { registerUser };
