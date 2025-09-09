import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { loginUser, registerUser } from "../services/userService";

// user register controller.
const userControllerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.body);

    // 1. validation.
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw createHttpError(400, "All Fields are required");
    }

    // 2. process.(DB calls)
    const user = await registerUser(name, email, password);

    // 3. response.
    res.status(201).json({
      statusCode: 201,
      message: "user Registered",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// user login controller.
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("Headers:", req.headers["content-type"]);
    // console.log("Body:", req.body);

    // Step: 1. validations.
    const { email, password } = req.body;
    if (!email || !password) {
      throw createHttpError(400, "All Fileds are required");
    }

    // Step: 4. process The Requests like DB calls and alls.
    const user = await loginUser(email, password);
    // console.log("controller ::", user);


    // Step: 3. Return response.
    res.status(200).json({
      statusCode: 200,
      message: "user login",
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export { userControllerPost, userLogin };
