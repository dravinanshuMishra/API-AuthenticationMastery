// 1. import dotenv config as conf for use .env file inside all variabless.
import { config as conf } from "dotenv";
conf();

// 2.  _config, batata hai ye private hai aur freeze se ye readOnly ban gaya bahar koi PORt change nahi kr sakta hai.
const _config = {
  port: process.env.PORT,
};

export const config = Object.freeze(_config);
