import path from "node:path";
import cloudinary from "../config/cloudinaryConfig";
import {
  BookMeta,
  FileGroup,
  UploadedFiles,
} from "../types/bookTypes";
import bookModel from "../models/bookModel";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import deleteLocalFile from "../utils/deleteLocalFile";

// BOOK UPLOAD SERVICE FOR CLOUDINARY.
const bookUploadService = async (files: UploadedFiles, bookId: string) => {

  // STEP: 1. FOR COVER IMAGE AND PDF FILE UPLOAD TO CLOUDINARY.
  const coverImageFileName = files.coverImage[0].filename;
  const coverImageFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads/" + coverImageFileName
  );
  const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];

  const coverImageUpload = await cloudinary.uploader.upload(
    coverImageFilePath,
    {
      resource_type: "image",
      folder: "book_covers",
      filename_override: coverImageFileName,
      public_id: `book_cover_${bookId}`,
      format: coverImageMimeType,
    }
  );
  // console.log("coverImageUpload ::", coverImageUpload);

  // STEP: 2. FOR PDF FILE UPLOAD TO CLOUDINARY.
  const pdfFileName = files.file[0].filename;
  const pdfFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads/" + pdfFileName
  );
  const pdfFileMimeType = files.file[0].mimetype.split("/")[1];

  const pdfFileUpload = await cloudinary.uploader.upload(pdfFilePath, {
    resource_type: "auto",
    folder: "book_pdfs",
    filename_override: pdfFileName,
    public_id: `book_pdf_${bookId}`,
    format: pdfFileMimeType,
  });
  // console.log("pdfFileUpload ::", pdfFileUpload);

  // STEP: 3. Return the uploaded file details.
  return {
    coverImage: coverImageUpload,
    pdfFile: pdfFileUpload,
  };
};

// Book Update services.
const bookUpdate = async (
  files: FileGroup,
  meta: BookMeta,
  bookId: string,
  userId: Types.ObjectId
) => {
  console.log("book update");
  console.log(files);
  console.log(meta.title);
  // console.log(bookId);
  // console.log(userId);

  // STEP 1: Verify book existence in DB
  const book = await bookModel.findOne({ _id: bookId });
  if (!book) {
    throw createHttpError(404, "Book not found");
  }

  // console.log("bookAuthor ::",book?.author);
  // console.log("userId ::",userId);
  // Step: 2. verify.
  if (book?.author.toString() !== userId.toString()) {
    throw createHttpError(403, "You are not authorized to update this book");
  }

  // bookUpdate service ke andar

  // STEP: CoverImage update
  let myCoverImage = book.coverImage;
  if (files.coverImage && files.coverImage.length > 0) {
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + fileName
    );
    const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];

    try {
      const uploadCoverImage = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        folder: "book_covers",
        public_id: `book_cover_${bookId}`, // FIXED → stable per book
        overwrite: true, // overwrite old image
        format: coverImageMimeType,
      });

      myCoverImage = uploadCoverImage.secure_url;
    } finally {
      await deleteLocalFile(filePath).catch(console.error);
    }
  }

  // STEP: File update
  let myFile = book.file;
  if (files.file && files.file.length > 0) {
    const fileName = files.file[0].filename;
    const fileMimeType = files.file[0].mimetype.split("/")[1];
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + fileName
    );

    try {
      const uploadFile = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
        folder: "book_pdfs",
        public_id: `book_pdf_${bookId}`, // FIXED → stable per book
        overwrite: true, // overwrite old file
        format: fileMimeType,
      });

      myFile = uploadFile.secure_url;
    } finally {
      await deleteLocalFile(filePath).catch(console.error);
    }
  }

  // find and update.
  const updateBook = await bookModel.findByIdAndUpdate(
    { _id: bookId },
    {
      title: meta.title ?? meta.title,
      genre: meta.genre ?? meta.genre,
      coverImage: myCoverImage ? myCoverImage : book.coverImage,
      file: myFile ? myFile : book.file,
    },
    { new: true }
  );

  return { updateBook };
};

export { bookUploadService,  bookUpdate };
