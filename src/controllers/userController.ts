import { NextFunction, Request, Response } from "express";

// functions way to create controllers.
const userControllerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "user Registered",
  });

  next();
};

export { userControllerPost };
