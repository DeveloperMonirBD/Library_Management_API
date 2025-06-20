import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
// import { sendResponse } from '../../utils/sendResponse';

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





// // 📚 Get all books (with filtering, sorting, and limiting)
// export const getAllBooks = async (req: Request, res: Response) => {
//     try {
//         const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

//         const query: any = {};
//         if (filter) query.genre = filter;

//         const books = await Book.find(query)
//             .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
//             .limit(parseInt(limit as string));

//         sendResponse(res, {
//             success: true,
//             message: 'Books retrieved successfully',
//             data: books
//         });
//     } catch (error) {
//         sendResponse(res, {
//             success: false,
//             message: 'Failed to retrieve books',
//             error
//         });
//     }
// };

// // 📖 Get book by ID
// export const getSingleBook = async (req: Request, res: Response) => {
//     try {
//         const { bookId } = req.params;
//         const book = await Book.findById(bookId);

//         if (!book) {
//             return sendResponse(res, {
//                 success: false,
//                 message: 'Book not found',
//                 error: { message: 'Invalid book ID' }
//             });
//         }

//         sendResponse(res, {
//             success: true,
//             message: 'Book retrieved successfully',
//             data: book
//         });
//     } catch (error) {
//         sendResponse(res, {
//             success: false,
//             message: 'Failed to retrieve book',
//             error
//         });
//     }
// };

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
