import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/dbConfig";

const port = config?.port || 8081;

connectDB();

// server start.
const serverStart = () => {
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

serverStart();
