// import expressJS here.
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// routes define here.
app.get("/", (req, res, next) => {
    res.json({ message: "welcome to my first api server" });
    next();
});

// Step: Error handling always last me rakhe,  globalErrorHandler function ka reference pass kare bus.
app.use(globalErrorHandler);

export default app;
