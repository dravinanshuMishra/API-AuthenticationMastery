// import expressJS here.
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import configureRoute from "./routers/configureRoute";

const app = express();

// Root Endpoint
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome To The Server" });
    next();
});

// Configure route here.
configureRoute(app);

// Step: Error handling always last me rakhe,  globalErrorHandler function ka reference pass kare bus.
app.use(globalErrorHandler);

export default app;
