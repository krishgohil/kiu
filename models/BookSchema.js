const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
    content_id: { type: String },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "AllContent" },
    date: { type: Date, default: Date.now },

});

BookSchema.index({ bookName: 'text', description: 'text' })

const Book = mongoose.model('Book', BookSchema);
module.exports = Book
