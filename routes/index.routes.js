const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Books');

require('dotenv').config();

/* GET home page */
router.get("/", (req, res, next) => {
  Book.find()
  .then((allBooks)=>{
  res.render("index", {allBooks,userInSession: req.session.currentUser})

  })
})

module.exports = router;
