import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { registerUser } from "../services/userService";

// functions way to create controllers.
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
      message: "user Registered",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { userControllerPost };
