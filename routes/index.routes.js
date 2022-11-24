const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Books');

require('dotenv').config();
/* const {GOOGLE_KEY} = require('dotenv') */

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {userInSession: req.session.currentUser})
})

/* router.get('/', (req, res, next) => {
  if (req.session.currentUser.id) {
    // Il faut retrieve l'utilisateur dans la BDD:
    // (à verifier ca depend ce que vous avez stocké dans req.session.currentUser)
    User.findOne({ id: req.session.currentUser.id }).then((user) => {
      // Ensuite on cherche les livres qui correspondent au prefs
      // TODO => Pour le moment les preferences ne sont pas enregistrés dans la BDD
      const reco = Book.find({ genre: user.prefGenre }).then(pref => {
        // La il faudra checker car tu va surement te retrouver avec un array avec plusieurs prefs, donc il faudra regarder comment faire une recherche avec plusieurs items sur Mongoose ;) 
        // Ensuite tu genere ta page avec les resultats des prefs 
        res.render('index', { userInSession: req.session.currentUser, reco:pref })
      })
    });
  }

  res.render('index', { userInSession: req.session.currentUser });
}); */

/////// book routes ////////

/* router.get('/search/:input', (req, res) => {
  const bookName = req.params.input;

  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=subject:${bookName}`)
    .then((response) => {
      console.log(response.data.items[0]);
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
}); */

module.exports = router;
