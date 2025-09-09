import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { registerUser } from "../services/userService";

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
    res.status(200).send({
      status: 200,
      message: "user login",
    });
  } catch (error) {
    next(error);
  }
};

export { userControllerPost, userLogin };
