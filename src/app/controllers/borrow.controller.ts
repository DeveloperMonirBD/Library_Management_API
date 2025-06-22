import { Router, Request, Response } from 'express';
import Borrow  from '../models/borrow.model';
import { Book } from '../models/book.model';

const borrowRoutes = Router();
export { borrowRoutes };

// Borrow book
borrowRoutes.post('/borrow', async (req: Request, res: Response): Promise<void> => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        const book = await (Book as any).decrementCopies(bookId, quantity);

        const borrow = await Borrow.create({
            book: book._id,
            quantity,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    } catch (error: any) {
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
});
  
// Borrowed books summary
borrowRoutes.get('/borrow', async (req: Request, res: Response) : Promise<void> => {
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch summary',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
  