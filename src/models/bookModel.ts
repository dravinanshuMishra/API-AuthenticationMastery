import mongoose from "mongoose";
import { bookTypes } from "../types/bookTypes";

const bookSchema = new mongoose.Schema<bookTypes>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
      default: "",
    },
    coverImagePublicId: { type: String }, // public_id
    file: {
      type: String,
      required: false,
      default: "",
    },
    filePublicId: { type: String }, // public_id
  },
  { timestamps: true }
);

export default mongoose.model<bookTypes>("Book", bookSchema);
