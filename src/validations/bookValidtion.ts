
import createHttpError from "http-errors";
import { BookMeta, UploadedFiles } from "../types/bookTypes";

/**
 * Validates book metadata and uploaded files
 * @param book Book metadata (title, genre)
 * @param files Uploaded files (coverImage, file)
 */
const bookValidation = async (book: BookMeta, files: UploadedFiles) => {
  const { title, genre } = book;

  // STEP 0: Validate metadata
  if (!title || title.trim() === "") {
    throw createHttpError(400, "Please provide a title.");
  }
  if (!genre || genre.trim() === "") {
    throw createHttpError(400, "Please provide a genre.");
  }

  // STEP 1: Validate uploaded files
  if (!files.coverImage || files.coverImage.length === 0) {
    throw createHttpError(400, "Cover image is required.");
  }
  if (!files.file || files.file.length === 0) {
    throw createHttpError(400, "Book file (PDF) is required.");
  }

  // Optional: Validate file types
  const coverMime = files.coverImage[0].mimetype;
  if (!coverMime.startsWith("image/")) {
    throw createHttpError(400, "Cover image must be an image file.");
  }

  const pdfMime = files.file[0].mimetype;
  if (pdfMime !== "application/pdf") {
    throw createHttpError(400, "Book file must be a PDF.");
  }
};

export default bookValidation;
