import path from "node:path";
import cloudinary from "../config/cloudinaryConfig";
import { BookFiles, BookMeta, UploadedFiles } from "../types/bookTypes";
import bookModel from "../models/bookModel";

// BOOK UPLOAD SERVICE FOR CLOUDINARY.
const bookUploadService = async(files: UploadedFiles) => {
    // Business Logic
    // console.log("files bookUploadService ::", files);
    
    // STEP: 1. FOR COVER IMAGE AND PDF FILE UPLOAD TO CLOUDINARY.
    const coverImageFileName = files.coverImage[0].filename;
    const coverImageFilePath = path.resolve(__dirname, "../../public/data/uploads/" + coverImageFileName);
    const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];

    const coverImageUpload = await cloudinary.uploader.upload(coverImageFilePath, {
        resource_type: "image",
        folder: "book_covers",
        filename_override: coverImageFileName,
        public_id: `book_cover_${Date.now()}`,
        format: coverImageMimeType
    });
    console.log("coverImageUpload ::", coverImageUpload);

    // STEP: 2. FOR PDF FILE UPLOAD TO CLOUDINARY.
    const pdfFileName = files.file[0].filename;
    const pdfFilePath = path.resolve(__dirname, "../../public/data/uploads/" + pdfFileName);
    const pdfFileMimeType = files.file[0].mimetype.split("/")[1];

    const pdfFileUpload = await cloudinary.uploader.upload(pdfFilePath, {
        resource_type: "auto",
        folder: "book_pdfs",
        filename_override: pdfFileName,
        public_id: `book_pdf_${Date.now()}`,
        format: pdfFileMimeType
    });
    console.log("pdfFileUpload ::", pdfFileUpload);

    // STEP: 3. Return the uploaded file details.
    return {
        coverImage: coverImageUpload,
        pdfFile: pdfFileUpload
    };
}


// STORE BOOKS ALL DATA FROM DATABASE.
const bookServices = async (files: BookFiles, meta: BookMeta) => {
//   console.log("db calles ::", files, meta);
  console.log(files.coverImage.secure_url);
  console.log(files.pdfFile.secure_url);
  console.log(meta.title);
  console.log(meta.genre);

  const newBook = await bookModel.create({
    title: meta?.title,
    author: "68bfd742b59ff91a24eea09f", // hardcoded user id, later change with dynamic id.
    genre: meta?.genre,
    coverImage: files.coverImage.secure_url,
    file: files.pdfFile.secure_url
  });
  console.log("newBook ::", newBook);

  // DB entry banane ka code
  return { newBook };
};


export { bookUploadService, bookServices }