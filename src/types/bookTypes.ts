import { userTypes } from "./userTypes";
import { UploadApiResponse } from "cloudinary";

// create interface for books.
export interface bookTypes {
    _id: string,
    title: string,
    author: userTypes,
    genre: string,
    coverImage: string,
    coverImagePublicId: string,
    file: string,
    filePublicId: string,
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


// #############################
// FOR UPDATE BOOKS TYPE HERE.
// #############################
// Single uploaded file type
export interface FileItem {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// Files object type (req.files shape)
export interface FileGroup {
  coverImage: FileItem[];
  file: FileItem[];
}




export { UploadedFiles, BookFiles, BookMeta }