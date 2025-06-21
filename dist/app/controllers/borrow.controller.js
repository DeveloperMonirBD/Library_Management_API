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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = require("../models/book.model");
exports.borrowRoutes = express_1.default.Router();
// Borrow book
exports.borrowRoutes.post('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.decrementCopies(bookId, quantity);
        const borrow = yield borrow_model_1.default.create({ book: book._id, quantity, dueDate });
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message || 'Failed to borrow book' });
    }
}));
// Borrowed books summary
exports.borrowRoutes.get('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { $unwind: '$book' },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$book.title',
                        isbn: '$book.isbn'
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch summary',
            error: (error instanceof Error ? error.message : 'Unknown error')
        });
    }
}));
