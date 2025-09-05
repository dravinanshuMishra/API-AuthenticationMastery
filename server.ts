import app from "./src/app";
import { config } from "./src/config/config";

const port = config?.port || 8081;

// server start.
const serverStart = () => {
  app.listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

serverStart();
