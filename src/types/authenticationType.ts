import { Request } from "express";

interface AuthRequest extends Request {
    userId?: string; // Optional property to hold the user ID after authentication
}

export { AuthRequest };
