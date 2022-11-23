const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    Title:{
        type: String,
        unique: true,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
    {timestamp: true}
)



const Book = mongoose.model('Book', bookSchema);
module.exports = Book;