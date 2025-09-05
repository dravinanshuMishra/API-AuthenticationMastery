// import expressJS here.
import express from "express";

const app = express();


// routes define here.
app.get("/", (req, res, next) => {
    res.json({message: "welcome to my first api server"});
    next();
})

export default app;