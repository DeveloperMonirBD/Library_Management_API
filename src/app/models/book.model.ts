import { Schema, model } from 'mongoose';
import { BookModel, IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook, BookModel>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: {
            type: String,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            required: true
        },
        isbn: { type: String, unique: true, required: true },
        description: { type: String },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// 🧠 Attach static method to schema
bookSchema.statics.decrementCopies = async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (book.copies < quantity) throw new Error('Not enough copies available');
  
    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
  
    await book.save();
    return book;
  };

export const Book = model<IBook, BookModel>('Book', bookSchema);
