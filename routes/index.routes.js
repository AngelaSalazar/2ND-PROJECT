const express = require('express');
const router = express.Router();
const axios = require('axios')
require("dotenv").config();
/* const {GOOGLE_KEY} = require('dotenv') */

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {userInSession: req.session.currentUser});
});

/////// book routes ////////

router.get("/search/:input", (req, res) => {
  const bookName = req.params.input

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${bookName}`).then((response) => {
    console.log(response.data.items[0])  
})
    

  // const options = {
  //   method: "GET",
  //   url: "https://instagram47.p.rapidapi.com/post_comments",
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
