const {Router} = require('express');
const router = new Router();

const bcryptjs = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User.model')

const mongoose = require('mongoose')

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js')

//////////// S I G N   U P ///////////
 
// GET route ==> to display the signup form to users
router.get('/signup', isLoggedOut, (req, res) => res.render('auth/sign-up.hbs'))
 
// POST route ==> to process form data
router.post('/signup', (req, res, next) => {

    const {username, password} = req.body

    if (!username || !password) {
      res.render('auth/sign-up.hbs', { errorMessage: 'All fields are mandatory. Please provide both username and password.' });
      return;
    }

    bcryptjs
    .genSalt(saltRounds)

    .then(salt => bcryptjs.hash(password, salt))

    .then(hashedPassword => {
      return User.create({
        username,
        passwordHash: hashedPassword
      })

    })
    .then(userFromDB => {
      res.redirect('/userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {

        res.status(500).render('auth/sign-up.hbs', {errorMessage: error.message });
      } 

      else if (error.code === 11000) {
        res.status(500).render('auth/sign-up.hbs', {
           errorMessage: 'This username is already taken'
        });
      } 
      
      else {
        next(error);
      }
    })

    .catch(error => next(error));
  });

  //////////// L O G I N ///////////
 
// GET route ==> to display the login form to users
router.get('/login',isLoggedOut, (req, res) => res.render('auth/login.hbs'));

// POST login route ==> to process form data
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  console.log('SESSION =====> ', req.session)
 
  if (username === '' || password === '') {
    res.render('auth/login.hbs', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('auth/login.hbs', { errorMessage: 'Username is not registered. Try with other one.' });
        return;
      } 

      else if (bcryptjs.compareSync(password, user.passwordHash)) {
        /* res.render('users/user-profile', { user }); */
        req.session.currentUser = user;
        res.redirect('/userProfile');
      } 
      
      else {
        res.render('auth/login.hbs', { errorMessage: 'Incorrect password.' });
      }
    })
    
    .catch(error => next(error));
});
 
router.get('/userProfile', isLoggedIn, (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});

  //////////// L O G   O U T ///////////

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});


//////////// S E A R C H   U P ///////////

/* router.post() */

module.exports = router;