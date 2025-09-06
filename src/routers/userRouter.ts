// user Routing here.
import express from "express";
import { userControllerPost } from "../controllers/userController";

const userRouters = express.Router();

// routes.
userRouters.post("/register", userControllerPost);

export default userRouters;