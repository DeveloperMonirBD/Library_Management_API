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
const express_1 = require("express");
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = require("../models/book.model");
const borrowRoutes = (0, express_1.Router)();
exports.borrowRoutes = borrowRoutes;
// Borrow book
borrowRoutes.post('/borrow/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { book: bookId, quantity, dueDate } = req.body;
        const { bookId } = req.params; // now from URL
        const { quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.decrementCopies(bookId, quantity);
        const borrow = yield borrow_model_1.default.create({
            book: book._id,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        const msg = error.message || 'Failed to borrow book';
        const { book: bookId } = req.body;
        if (msg === 'Book not found') {
            res.status(404).json({
                success: false,
                message: msg,
                error: { bookId }
            });
            return;
        }
        if (msg === 'Not enough copies available') {
            res.status(400).json({
                success: false,
                message: msg
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: msg
        });
    }
}));
// Borrowed books summary
borrowRoutes.get('/borrow-summary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (summary.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No borrowed book records found',
                error: null
            });
            return;
        }
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
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
