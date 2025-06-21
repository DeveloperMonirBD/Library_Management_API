import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
    {
        quantity: { type: Number, required: true },
        dueDate: { type: Date, required: true },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Borrow = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;
