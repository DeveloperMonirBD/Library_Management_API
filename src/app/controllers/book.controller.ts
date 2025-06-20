import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes = express.Router();

// 🆕 Create a new book
bookRoutes.post('/books', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create book',
            error
        });
    }
});

// 📚 Get all books (with filtering, sorting, and limiting)
bookRoutes.get('/books', async (req: Request, res: Response) => {
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
bookRoutes.get('/books/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findOne({ _id: bookId });
        
        // if (!book) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Book not found'
        //     });
        // }

        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book',
            error: (error as Error).message
        });
    }
});


// // ✏️ Update book
// export const updateBook = async (req: Request, res: Response) => {
//     try {
//         const { bookId } = req.params;
//         const updated = await Book.findByIdAndUpdate(bookId, req.body, {
//             new: true,
//             runValidators: true
//         });

//         sendResponse(res, {
//             success: true,
//             message: 'Book updated successfully',
//             data: updated
//         });
//     } catch (error) {
//         sendResponse(res, {
//             success: false,
//             message: 'Failed to update book',
//             error
//         });
//     }
// };

// // 🗑️ Delete book
// export const deleteBook = async (req: Request, res: Response) => {
//     try {
//         const { bookId } = req.params;
//         await Book.findByIdAndDelete(bookId);

//         sendResponse(res, {
//             success: true,
//             message: 'Book deleted successfully',
//             data: null
//         });
//     } catch (error) {
//         sendResponse(res, {
//             success: false,
//             message: 'Failed to delete book',
//             error
//         });
//     }
// };
