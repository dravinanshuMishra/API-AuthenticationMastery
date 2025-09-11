import { userTypes } from "./userTypes"

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