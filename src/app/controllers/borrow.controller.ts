import express, { Request, Response } from 'express';
import Borrow  from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRoutes = express.Router();

// Borrow book
borrowRoutes.post('/borrow', async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await (Book as any).decrementCopies(bookId, quantity);
        const borrow = await Borrow.create({ book: book._id, quantity, dueDate });

        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message || 'Failed to borrow book' });
    }
});

// Borrowed books summary
borrowRoutes.get('/borrow', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch summary',
            error: error.message
        });
    }
});