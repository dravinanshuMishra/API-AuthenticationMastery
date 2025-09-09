import userModel from "../models/userModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

// For user Ragistration SignUp.
const registerUser = async (name: string, email: string, password: string) => {
  // console.log("register", name, email, password);

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

// For user Login.
const loginUser = async (email: string, password: string) => {
  // console.log("login service ::", email, password);

  // 1. check user exists or not.
  const user = await userModel.findOne({ email: email });
  // console.log(user);

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  // 2. match email and password.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(401, "Invalid email or password");
  }

  // 3. AccessToken and RefreshToken create.
  const accessToken = jwt.sign(
    { userId: user._id },
    config.access_token_secret as string,
    {
      expiresIn: 3600,
    } // 1 h.
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    config.refresh_token_secret as string,
    { expiresIn: 7 * 24 * 60 * 60 } // 24 hours
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
  };
};

export { registerUser, loginUser };
