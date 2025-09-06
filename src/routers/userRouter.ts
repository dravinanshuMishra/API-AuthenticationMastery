// user Routing here.
import express from "express";

const userRouters = express.Router();

// routes.
userRouters.post("/register", (req, res) => {
    res.json({message: "user registred successfully !!"});
})

export default userRouters;