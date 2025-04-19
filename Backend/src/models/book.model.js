const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({      
    title: {
        type: String,
        required: [true, "Book's name is required"],
    },
    cover: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;