// 1. import dotenv config as conf for use .env file inside all variabless.
import { config as conf } from "dotenv";
conf();

// 2.  _config, batata hai ye private hai aur freeze se ye readOnly ban gaya bahar koi PORt change nahi kr sakta hai.
const _config = {
  port: process.env.PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_cluster: process.env.DB_CLUSTER,
  db_options: process.env.DB_OPTIONS,
  node_env: process.env.NODE_ENV,
  backend_url: process.env.BACKEND_URL,
  frontend_url: process.env.FRONTEND_URL,
  // JWT SECRET KEYS.
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  // Cloudinary Configurations.
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
