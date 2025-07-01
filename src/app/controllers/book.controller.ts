import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import Borrow  from '../models/borrow.model';

export const bookRoutes = express.Router();

// 🆕 Create a new book
bookRoutes.post('/create-book', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error: any) {
        // Duplicate ISBN (MongoDB unique index violation)
        if (error.code === 11000) {
            res.status(409).json({
                success: false,
                message: 'ISBN must be unique',
                error: error.keyValue
            });
            return;
        }

        // Mongoose Validation Error
        if (error.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: error.errors
            });
            return;
        }

        // Fallback for other unhandled errors
        res.status(500).json({
            success: false,
            message: 'Failed to create book',
            error: error.message || error
        });
    }
});

// 📚 Get all books (with filtering, sorting, and limiting)
bookRoutes.get('/books', async (req: Request, res: Response): Promise<void> => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;

        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const sortOrder = sort === 'desc' ? -1 : 1;
        const books = await Book.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit(parseInt(limit as string, 10));

        if (books.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No books found matching the query',
                error: {
                    filter
                }
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error
        });
    }
});

// 📖 Get book by ID without tryCatch method
// bookRoutes.get('/books/:id', async (req: Request, res: Response) => {
//     const bookId = req.params.id;
//     const book = await Book.findOne({ _id: bookId });
//     res.status(201).json({
//         success: true,
//         message: 'Book retrieved successfully',
//         book
//     });
// });

// 📖 Get book by ID
bookRoutes.get('/books/:id', async (req: Request, res: Response): Promise<void> => {
    const bookId = req.params.id;

    try {
        const book = await Book.findOne({ _id: bookId });

        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book',
            error: (error as Error).message
        });
    }
});

// ✏️ Update book
bookRoutes.put('/edit-book/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const bookId = req.params.id;
        const updateData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true, runValidators: true });

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: {
                    bookId
                }
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error: any) {
        // Optional: CastError check for invalid ObjectId
        if (error.name === 'CastError') {
            res.status(400).json({
                success: false,
                message: 'Invalid Book ID',
                error: {
                    path: error.path,
                    value: error.value
                }
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update book',
            error: error.message || error
        });
    }
});

// 🗑️ Delete book
bookRoutes.delete('/books/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const bookId = req.params.id;
        // const deletedBook = await Book.findByIdAndDelete(bookId);
        const deletedBook = await Book.findOneAndDelete({ _id: bookId });

        // Delete all borrows associated with this book
        const deletedBorrow = await Borrow.deleteMany({ book: bookId });
     
        // If no book was found or deleted, return 404
        // If no borrows were deleted, return 404
        if (!deletedBook && deletedBorrow.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                error: {
                    bookId
                }
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    } catch (error: any) {
        // Optional: handle invalid ObjectId
        if (error.name === 'CastError') {
            res.status(400).json({
                success: false,
                message: 'Invalid Book ID',
                error: {
                    path: error.path,
                    value: error.value
                }
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error.message || error
        });
    }
});
