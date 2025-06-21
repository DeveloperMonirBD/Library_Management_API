import { Model } from 'mongoose';

import { Types } from 'mongoose';

export interface IBorrow {
    quantity: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    book: Types.ObjectId; // Reference to a Book
}

// ⚙️ Interface for the Book model (static methods go here)
export interface BorrowModel extends Model<IBorrow> {
    // You can define reusable logic like summary aggregations here
    getSummary(): Promise<any>;
}
