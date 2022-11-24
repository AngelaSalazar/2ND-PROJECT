const {Router} = require('express');
const router = new Router();
const Book = require('../models/Books')
const mongoose = require('mongoose');
const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js')

  //////////// N E W   B O O K ///////////

// GET route ==> render create page
router.get('/newbook', (req, res) => res.render('create-books',{ userInSession: req.session.currentUser } ))

// POST route ==> 
router.post('/newbook', (req,res,next)=>{
    const userId =  req.session.currentUser._id
    const {Title, Author, Genre} = req.body

    if (!Title ||!Author ||!Genre) {
        res.render('create-books', { errorMessage: 'All fields are mandatory. Please provide title, author and genre.', userInSession: req.session.currentUser  });
        return;
      }
      console.log("this ise userID: ",userId)
    Book.create({Title, Author, Genre, creator: userId})
    .then(() => {
        res.redirect("books")
    })
    .catch((err) =>{
        res.render("create-books",{ userInSession: req.session.currentUser } )
    })
})


  //////////// A L L   B O O K S ///////////


router.get("/books", (req, res, next) =>{
    Book.find()
    .then((allBooks)=>{
     res.render("books", {allBooks,  userInSession: req.session.currentUser })
    })
    .catch((err) =>{
     console.log(err)
    })
 })


   //////////// B O O K   D E T A I L S ///////////

router.get("/book/:id", (req, res, next) =>{
    const id = req.params.id

    Book.findById(id)
    .then((book) =>{
        res.render("book", {book, userInSession: req.session.currentUser})
    })
    .catch((err) => console.log(err))
})

    //////////// D E L E T E   B O O K ///////////

router.post("/book/:id/delete", (req, res, next)=>{
    const id = req.params.id
    const userId = req.session.currentUser._id

    Book.findById(id).then((response)=>{
console.log("this is session: ", userId)
console.log("this is book creator: ", response.creator._id.toString() )
    if (userId === response.creator._id.toString()) {
        Book.findByIdAndRemove(id)
        .then((deletedBook) =>{
            res.redirect("/books")
        })
    } else {
        Book.find()
    .then((allBooks)=>{
     res.render("books", {allBooks, errorMessage: 'you cannot delete what is not yours', userInSession: req.session.currentUser })
    })
    .catch((err) =>{
     console.log(err)
    })
    
    }
    })
})

//////////// U P D A T E   B O O K ///////////

router.get("/books/:id/edit", (req, res) => {
    const id = req.params.id
    const userId = req.session.currentUser._id
  
    Book.findById(id)
    .then(book => {
        if (userId === book.creator._id.toString()) {
        res.render("book-edit", { book, userInSession: req.session.currentUser  })
        }
        
        else {
            Book.find()
            .then((allBooks)=>{
             res.render("books", {allBooks, errorMessage: 'you cannot update something that is not yours', userInSession: req.session.currentUser })
            })
        }
    })
    .catch((err) =>{
        console.log(err)
       })
  })
  
  router.post("/books/:id/edit", (req, res) => {
    const id = req.params.id
    const { Title, Author, Genre } = req.body
  
    const book = {
        Title,
        Author,
        Genre
    }
  
    Book.findByIdAndUpdate(id, book)
    .then(createdBook => {
        res.redirect(`/book/${id}`)
    })
    .catch(err => {
        console.log(err)
    })
  })

//////////// s e a r c h  ///////////

router.get('/result', (req, res, next) => {
    const query = req.query.q
    const booksFound = []

    Book.find({ }) 
    .then(bookFromDB => {  
      if(bookFromDB === null){
          res.render('books-result', { message : 'Sorry, no results found', userInSession: req.session.currentUser})
          return
        } 
        else {

        for (let book of bookFromDB){ 
          if(book.Title.includes(query)) { 

            booksFound.push(book)
          }
          else if (book.Author.includes(query)) { 

            booksFound.push(book)
          }
          else if (book.Genre.includes(query)) { 

            booksFound.push(book)
          }
        } 
        
        console.log('this is the result:' , booksFound)
        res.render('books-result', {booksFound : booksFound, userInSession: req.session.currentUser}) 
      }

    })

    .catch(err => {
      next(err)
    })
  })


  //////////// R E A D   L I S T ///////////

  router





  //////////// likes ///////////



module.exports = router;