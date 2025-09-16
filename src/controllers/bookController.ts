import { NextFunction, Request, Response } from "express";
import {
  bookServices,
  bookUpdate,
  bookUploadService,
} from "../services/bookUploadService";
import { FileGroup, UploadedFiles } from "../types/bookTypes";
import deleteLocalFile from "../utils/deleteLocalFile";
import { AuthRequest } from "../types/authenticationType";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import bookValidation from "../validations/bookValidtion";
import cleanupLocalFiles from "../utils/cleanupLocalFiles";
import bookModel from "../models/bookModel";

// Create Book Controller.
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // STEP: 1. session Start kr diya Jo dat failed ho jaaye taaki roll back kiya jaa sake.
  const session = await bookModel.startSession();
  session.startTransaction();

  try {
    // STEP: 2. Validate book data.
    await bookValidation(req.body, req.files as UploadedFiles);

    // Extra Things :: controller side userId get. who we set in authMiddleware request object.
    const _req = req as AuthRequest;
    const userId = new Types.ObjectId(_req.userId); // ✅ convert string → ObjectId
    console.log("userId controller side ::", userId);

    //  STEP: 1. Call the service function for cloudinary upload files.
    const data = await bookUploadService(req.files as UploadedFiles);
    // console.log("This is controller book services called here ::", data);

    // STEP: 2. Create book entry in DB.
    const bookData = await bookServices(data, req.body, userId);
    // console.log("controller DB calles",bookData);

    // STEP: 3. Delete files from local uploads folder.
    const coverImageFilePath = `public/data/uploads/${
      (req.files as UploadedFiles).coverImage[0].filename
    }`;
    const pdfFilePath = `public/data/uploads/${
      (req.files as UploadedFiles).file[0].filename
    }`;
    await deleteLocalFile(coverImageFilePath);
    await deleteLocalFile(pdfFilePath);

    // STEP: 4. Send response.
    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "created books",
      data: bookData,
    });
  } catch (error) {
    // ❌ Validation / Upload / DB error -> delete temp files if exist
    if (req.files) {
      await cleanupLocalFiles(req.files as UploadedFiles);
    }
    next(error);
  }
};

// Update Book Controller.
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.params);
    // console.log(req.body);
    // console.log(req.files);
    const { bookId } = req.params;
    const files = req.files as unknown as FileGroup;
    const _req = req as AuthRequest;
    const userId = new Types.ObjectId(_req.userId); // ✅ convert string → ObjectId
    console.log("userId controller side ::", userId);

    // STEP: 1. VALIDATE bookId.
    if (!bookId) {
      return next(createHttpError(400, "BookId is required"));
    }

    // STEP: 2. FOR DB CALLS.
    const updatedData = await bookUpdate(files, req.body, bookId, userId);
    console.log("controller side updated data ::", updatedData);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Book updated successfully",
      data: updatedData,
    });
  } catch (error) {
    // Validation / Upload / DB error -> delete temp files if exist
    if (req.files) {
      await cleanupLocalFiles(req.files as UploadedFiles);
    }
    next(error);
  }
};

export { createBook, updateBook };
