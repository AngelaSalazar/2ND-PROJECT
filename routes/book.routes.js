const {Router} = require('express');
const router = new Router();
const Book = require('../models/Books')
const mongoose = require('mongoose');
const User = require('../models/User.model');

  //////////// N E W   M O V I E ///////////

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


  //////////// A L L   M O V I E S ///////////


router.get("/books", (req, res, next) =>{
    Book.find()
    .then((allBooks)=>{
     res.render("books", {allBooks,  userInSession: req.session.currentUser })
    })
    .catch((err) =>{
     console.log(err)
    })
 })

module.exports = router;