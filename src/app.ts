// import expressJS here.
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import configureRoute from "./routers/configureRoute";

const app = express();

// express.json(), converts JSON string data into JS object. without isake req.body undefined dega.
app.use(express.json());

// Agar form-data aata hai to (optional)
app.use(express.urlencoded({ extended: true }));

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
