import { Model } from 'mongoose';

// 🧾 Interface for a single Book document
export interface IBook {
    title: string;
    image: string;
    author: string;
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// ⚙️ Interface for the Book model (static methods go here)
export interface BookModel extends Model<IBook> {
    // Example static method (you can implement this in your model)
    updateAvailability(bookId: string): Promise<void>;
}
