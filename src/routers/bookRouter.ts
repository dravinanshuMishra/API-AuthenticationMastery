import express from 'express';
import { createBook } from '../controllers/bookController';
import bookUpload from '../middlewares/bookMulter';
import authMiddleware from '../middlewares/authMiddleware';


const bookRouters = express.Router();

// BookRouter Basic Crud operations.
bookRouters.post("/create-book", authMiddleware, bookUpload.fields([
    {name: "file", maxCount: 1},
    {name: "coverImage", maxCount: 1}
]) ,createBook);

export default bookRouters;