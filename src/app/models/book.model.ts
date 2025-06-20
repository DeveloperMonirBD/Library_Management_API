import { Schema, model } from 'mongoose';
import { BookModel, IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
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

export const Book = model<IBook, BookModel>('Book', bookSchema);
