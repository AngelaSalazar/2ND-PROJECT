const mongoose=require("mongoose")
const Books=require("./models/books")

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;
mongoose.connect(mongouri);

const books = [    
    {
        "Title" : "",
        "Author" : "",
        "Genre" : ""  
    },
]


Books.insertMany(books)
  .then((data) => {
    console.log(
      `Success - ${data.length} locations got created`
    );
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));