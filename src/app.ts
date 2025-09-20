// import expressJS here.
import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import configureRoute from "./routers/configureRoute";
import cors from "cors";
import { config } from "./config/config";

const app = express();

// add CORS.
app.use(
  cors({
    origin: config.frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600, // seconds (cache preflight response)
  })
);

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
