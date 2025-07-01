"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
// 🧠 Attach static method to schema
bookSchema.statics.decrementCopies = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < quantity)
            throw new Error('Not enough copies available');
        book.copies -= quantity;
        if (book.copies === 0)
            book.available = false;
        yield book.save();
        return book;
    });
};
// ✅ Pre-save middleware(CREATE/UPDATE)
bookSchema.pre('save', function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    else {
        this.available = true;
    }
    next();
});
// ✅ Post-save middleware (CREATE/UPDATE confirmation)
bookSchema.post('save', function (doc) {
    console.log(`📗 Saved: ${doc._id}, "${doc.title}" now has ${doc.copies} copies. Available: ${doc.available}`);
});
// ✅ Pre-READ (find, findOne, findById)
bookSchema.pre(/^find/, function (next) {
    console.log('🔎 Finding book(s)...');
    next();
});
// ✅ Post-READ
bookSchema.post(/^find/, function (result) {
    if (Array.isArray(result)) {
        console.log(`📖 Found ${result.length} book(s)`);
    }
    else if (result) {
        console.log(`📖 Found one book: ${result.title}`);
    }
});
// ✅ Pre-UPDATE
bookSchema.pre('findOneAndUpdate', function (next) {
    console.log('✏️ Updating book...');
    next();
});
// ✅ Post-UPDATE
bookSchema.post('findOneAndUpdate', function (doc) {
    if (doc) {
        console.log(`✅ Updated: "${doc.title}", ${doc.copies} copies`);
    }
});
// ✅ Pre-DELETE
bookSchema.pre('findOneAndDelete', function (next) {
    console.log('🗑️ Deleting book...');
    next();
});
// ✅ Post-DELETE
bookSchema.post('findOneAndDelete', function (doc) {
    if (doc) {
        console.log(`🪵 Deleted: "${doc.title}" (ID: ${doc._id})`);
        exports.Book.deleteMany({ Id: doc._id });
    }
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
