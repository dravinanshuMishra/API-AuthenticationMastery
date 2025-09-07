import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { registerUser } from "../services/userService";

// functions way to create controllers.
const userControllerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body);

  // 1. validation.
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All Fields are required");
    return next(error);
  }   

  // 2. process.(DB calls)
  const user = await registerUser(name, email, password);
  console.log("controller :: ",user);
  next(user);

  // 3. response.
  res.status(201).json({
    message: "user Registered",
    data: user
  });
};

export { userControllerPost };
