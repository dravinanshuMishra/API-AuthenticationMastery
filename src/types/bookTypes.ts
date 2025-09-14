import { userTypes } from "./userTypes";
import { UploadApiResponse } from "cloudinary";

// create interface for books.
export interface bookTypes {
    _id: string,
    title: string,
    author: userTypes,
    genre: string,
    coverImage: string,
    file: string,
    createdAt: Date,
    updatedAt: Date,
}

// For multiple file uploads.
type UploadedFiles = {
  [fieldname: string]: Express.Multer.File[];
};

interface BookFiles {
  coverImage: UploadApiResponse;
  pdfFile: UploadApiResponse;
}

interface BookMeta {
  title: string;
  genre: string;
}


export { UploadedFiles, BookFiles, BookMeta }