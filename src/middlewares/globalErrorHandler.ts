import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

// global Error handler. (ye type declaration hai TS ka)
const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
    errorStack: config.node_env === "development" ? err.stack : "",
  });
  // next();  
}

export default globalErrorHandler;