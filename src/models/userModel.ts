import mongoose from "mongoose";
import { userTypes } from "../types/userTypes";

// step: 1. Schema create.
const userSchema = new mongoose.Schema<userTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// step: 2. model create.
export default mongoose.model<userTypes>('User', userSchema);
