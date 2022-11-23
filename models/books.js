const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Title: String,
    Author: String,
    Genre: String
})



const Book = mongoose.model('Book', bookSchema);
module.exports = Book;