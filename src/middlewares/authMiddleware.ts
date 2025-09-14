import { NextFunction, Request, Response } from "express"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("This is auth middleware called");
        next();
    } catch (error) {
        next(error)
    }

}

export default authMiddleware