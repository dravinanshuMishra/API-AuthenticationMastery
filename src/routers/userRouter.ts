// user Routing here.
import express from "express";
import { userControllerPost, userLogin } from "../controllers/userController";

const userRouters = express.Router();

// Routes for user Authntication.
userRouters.post("/register", userControllerPost); // user register.
userRouters.post("/login", userLogin); // user login.



export default userRouters;