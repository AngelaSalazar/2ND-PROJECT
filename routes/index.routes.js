const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {userInSession: req.session.currentUser});
});

/////// book routes ////////

router.get("/fetcher", (req, res) => {

  const options = {
    method: "GET",
    url: "https://instagram47.p.rapidapi.com/post_comments",
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
