const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/books');

require('dotenv').config();

/* GET home page */
router.get("/", (req, res, next) => {
  Book.find()
  .then((allBooks)=>{
    let reversed= allBooks.reverse()
    res.render("index", {reversed,  userInSession: req.session.currentUser })

  })
})

module.exports = router;
