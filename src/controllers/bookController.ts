import { NextFunction, Request, Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log(req.files);
    console.log(req.body);
    res.json({
      message: "created books",
    });
  } catch (error) {
    next(error);
  }
};

export { createBook };
