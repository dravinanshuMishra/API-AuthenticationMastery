// dbConfig.ts
import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    // step: 2. sabse pahle mongiDB ke event register karo tabhi console ka message dikhega.
    mongoose.connection.on("connected", () => {
       console.log("✅ MongoDB Connected Successfully!");
    })
   
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB Disconnected!");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🔌 MongoDB connection closed due to app termination");
      process.exit(0);
    });

    // step: 1. below rakho.
    await mongoose.connect(
      `mongodb+srv://${config.db_user}:${config.db_pass}@${config.db_cluster}/${config.db_name}?${config.db_options}`
    );


  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // server ko band kar deta hai agar db connect na ho
  }
};

export default connectDB;
