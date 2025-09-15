import express from 'express';
import { createBook, updateBook } from '../controllers/bookController';
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

// Delete Book.

// Get Book by Id.

// Get All Books.

export default bookRouters;