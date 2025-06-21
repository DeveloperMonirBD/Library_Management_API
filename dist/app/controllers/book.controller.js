"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// 🆕 Create a new book
exports.bookRoutes.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create book',
            error
        });
    }
}));
// 📚 Get all books (with filtering, sorting, and limiting)
exports.bookRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = sort === 'desc' ? -1 : 1;
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit, 10));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error
        });
    }
}));
// 📖 Get book by ID without tryCatch method
// bookRoutes.get('/books/:bookId', async (req: Request, res: Response) => {
//     const bookId = req.params.bookId;
//     const book = await Book.findOne({ _id: bookId });
//     res.status(201).json({
//         success: true,
//         message: 'Book retrieved successfully',
//         book
//     });
// });
// 📖 Get book by ID
exports.bookRoutes.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield book_model_1.Book.findOne({ _id: bookId });
        // if (!book) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Book not found'
        //     });
        // }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book',
            error: error.message
        });
    }
}));
// ✏️ Update book
exports.bookRoutes.put('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updateData = req.body;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update book',
            error
        });
    }
}));
// 🗑️ Delete book
exports.bookRoutes.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error
        });
    }
}));
