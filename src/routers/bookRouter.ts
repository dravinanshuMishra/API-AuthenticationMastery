import express from 'express';
import { createBook, deleteABook, getAllBook, getSpecificBook, updateBook } from '../controllers/bookController';
import bookUpload from '../middlewares/bookMulter';
import authMiddleware from '../middlewares/authMiddleware';

const bookRouters = express.Router();

// BookRouter Basic Crud operations.
// Create Book.
bookRouters.post("/create-book", authMiddleware, bookUpload.fields([
    {name: "file", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]) ,createBook);

// Update Book.
bookRouters.put("/update-book/:bookId", authMiddleware, bookUpload.fields([
    {name: "file", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]), updateBook);

// Get All Books. (Non- authenticate user can see the books)
bookRouters.get("/all-books", getAllBook);

// Get Book by Id. (when user update the book, user can edit the book)
bookRouters.get("/book/:bookId", authMiddleware, getSpecificBook);

// DELETE A BOOK BY ID.
bookRouters.delete("/delete-book/:bookId", authMiddleware, deleteABook);


export default bookRouters;