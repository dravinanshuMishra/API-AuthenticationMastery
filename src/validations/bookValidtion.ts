import createHttpError from "http-errors";
import { BookMeta, UploadedFiles } from "../types/bookTypes";

const bookValidation = async (book: BookMeta, files: UploadedFiles) => {
  const { title, genre } = book;
  if (!title) {
    throw createHttpError(400, "Please provide title.");
  }
  if (!genre) {
    throw createHttpError(400, "Please provide genre.");
  }

  // STEP: 1. Validate files
  if (!files.coverImage || files.coverImage.length === 0) {
    throw createHttpError(400, "Cover image is required");
  }

  if (!files.file || files.file.length === 0) {
    throw createHttpError(400, "Book file (PDF) is required");
  }
};
export default bookValidation;
