import { NextFunction, Request, Response } from "express";
import { bookServices, bookUploadService } from "../services/bookUploadService";
import { UploadedFiles } from "../types/bookTypes";
import deleteLocalFile from "../utils/deleteLocalFile";
import { AuthRequest } from "../types/authenticationType";
import { Types } from "mongoose";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("This is controller book ::", req.files);
    // console.log("This is controller book body ::", req.body);
    // const {title, genre} = req.body;

    //  STEP: 1. Call the service function for cloudinary upload files.
    const data = await bookUploadService(req.files as UploadedFiles);
    // console.log("This is controller book services called here ::", data);

    // Extra Things :: controller side userId get. who we set in authMiddleware request object.
    const _req = req as AuthRequest;
    const userId = new Types.ObjectId(_req.userId); // ✅ convert string → ObjectId
    console.log("userId controller side ::", userId);

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
    next(error);
  }
};

export { createBook };
