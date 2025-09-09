import { Application } from "express";
import userRouters from "./userRouter";

// All Routes Configure here.
const configureRoute = (app: Application) => {
  // user routes
  app.use("/api/v1/users", userRouters);
}

export default configureRoute;