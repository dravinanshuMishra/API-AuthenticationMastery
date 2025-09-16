import { NextFunction, Request, Response } from "express";
import {
  bookUpdate,
  bookUploadService,
} from "../services/bookUploadService";
import { FileGroup, UploadedFiles } from "../types/bookTypes";
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
    const { title, genre } = req.body;
    // console.log("title :", title);
    // console.log("genre :", genre);
    // STEP: 2. Validate book data safely, Convert req.files to type-safe UploadedFiles with fallback
    const uploadedFiles: UploadedFiles = {
      coverImage: (req.files as UploadedFiles)?.coverImage || [],
      file: (req.files as UploadedFiles)?.file || [],
    };
    // Call validation
    await bookValidation(req.body, uploadedFiles);

    // Extra Things :: controller side userId get. who we set in authMiddleware request object.
    const _req = req as AuthRequest;
    const userId = new Types.ObjectId(_req.userId); // ✅ convert string → ObjectId
    console.log("userId controller side ::", userId);

    // STEP: 3. Create a blank book entry in DB.
    const newBook = await bookModel.create(
      [
        {
          title: title,
          author: userId,
          genre: genre,
          coverImage: "",
          file: "",
        },
      ],
      { session }
    );
    console.log("ye hai ::", newBook[0]?._id);
    const bookId = newBook[0]?._id;

    // Step: 4. Ab cloudinary upload karo, bookId pass karke
    const data = await bookUploadService(req.files as UploadedFiles, bookId);
    console.log(data);

    // STEP: 5. Upload ke baad book update karo
    newBook[0].coverImage = data.coverImage.secure_url;
    newBook[0].file = data.pdfFile.secure_url;
    await newBook[0].save();

    // STEP: 4. Commit transaction.
    await session.commitTransaction();
    session.endSession();

    // STEP: 6. Local temp files delete
    await cleanupLocalFiles(req.files as UploadedFiles);

    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    // Rollback if upload fails.
    await session.abortTransaction();
    session.endSession();

    // Validation / Upload / DB error -> delete temp files if exist
    if (req.files) {
      await cleanupLocalFiles(req.files as UploadedFiles);
    }
    next(error);
  } finally {
    session.endSession();
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
