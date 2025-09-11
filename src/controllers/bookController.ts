import { NextFunction, Request, Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: "created books",
    });
  } catch (error) {
    next(error);
  }
};

export { createBook };
