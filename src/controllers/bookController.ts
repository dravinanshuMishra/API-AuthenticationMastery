import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinaryConfig";
import path from "node:path";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log(req.files);
    console.log(req.body);

  // Type causting
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const coverImageMimeType = files.coverImage[0].mimetype.split("/")[1];
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);
    console.log(coverImageMimeType, fileName, filePath);

    // Upload to cloudinary, coverImage.
    const uploadFiles = await cloudinary.uploader.upload(filePath, {
      folder: "books-covers",
      filename_override: fileName,
      resource_type: "auto",
      public_id: `book_cover_${Date.now()}`,
      format: coverImageMimeType
    });
    console.log(uploadFiles);

    // Book ke liye bhi upload karna hai cloudinary pe.
    const bookMimeType = files.file[0].mimetype.split("/")[1];
    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(__dirname, "../../public/data/uploads", bookFileName);
    console.log(bookMimeType, bookFileName, bookFilePath);

    // Upload to cloudinary, book.
    const uploadBook = await cloudinary.uploader.upload(bookFilePath, {
      folder: "books-files",
      filename_override: bookFileName,
      resource_type: "auto",
      public_id: `book_${Date.now()}`,
      format: bookMimeType
    });
    console.log(uploadBook);

    res.json({
      message: "created books",
    });
  } catch (error) {
    next(error);
  }
};

export { createBook };
