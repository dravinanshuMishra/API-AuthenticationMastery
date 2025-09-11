import { Application } from "express";
import userRouters from "./userRouter";
import bookRouters from "./bookRouter";

// All Routes Configure here.
const configureRoute = (app: Application) => {
  // user routes
  app.use("/api/v1/users", userRouters);
  // book router.
  app.use("/api/v1/books", bookRouters);
};

export default configureRoute;
