import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AuthRequest } from "../types/authenticationType";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
    //  STEP: 1. get the access Token from header.
    // const authHeader = req.headers["authorization"]; // is approach me always 'a' small me.
    // const authHeader = req.get("Authorization"); // cleaner
    const authHeader = req.header("Authorization");
     if(!authHeader) {
        return next(createHttpError(401, "Authorization token is required"));
     }
      const AccessToken = authHeader.split(" ")[1]; // "Bearer <token>"
    //   console.log(AccessToken);

    // Step : 2. verify the token.
    const decode = jwt.verify(AccessToken, config.access_token_secret as string);
    if (!decode) {
        return next(createHttpError(401, "Invalid authorization token"));
    }
    // console.log("decoded",decode);

    // Step : 3 Set the userId in request object for future use.
   const _req = req as AuthRequest;
   _req.userId = (decode as { userId: string }).userId;
//    console.log("req userId",_req.userId);

       next();
    } catch (error) {
        next(error)
    }

}

export default authMiddleware