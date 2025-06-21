"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});
const Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
exports.default = Borrow;
