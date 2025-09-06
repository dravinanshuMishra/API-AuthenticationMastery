// dbConfig.ts
import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.db_user}:${config.db_pass}@${config.db_cluster}/${config.db_name}?${config.db_options}`
    );
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // server ko band kar deta hai agar db connect na ho
  }
};

export default connectDB;
