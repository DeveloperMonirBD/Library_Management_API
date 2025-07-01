import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
    {
        quantity: { type: Number, required: true },
        image: { type: String },
        dueDate: { type: Date, required: true },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// 🔄 Pre-save: Log borrow intent
borrowSchema.pre('save', function (next) {
    console.log(`🕐 Preparing to borrow ${this.quantity} copy/copies of Book ID: ${this.book}`);
    next();
});

// ✅ Post-save: Confirm borrow success
borrowSchema.post('save', function (doc) {
    console.log(`✅ Borrowed successfully: Book ${doc.book}, Qty: ${doc.quantity}`);
});

const Borrow = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;
