import express from 'express';
import { createBook } from '../controllers/bookController';


const bookRouters = express.Router();

// BookRouter Basic Crud operations.
bookRouters.post("/create-book", createBook);

export default bookRouters;