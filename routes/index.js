var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión' });
});

router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
  }),
      function(req, res) {
          console.log("hello");

          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
      res.redirect('/');
  });
router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup', { message: req.flash('Registro') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    user : req.user // get the user out of session and pass to template
  });
});

router.get('/logout', function(req, res)
{
  req.logout();
  res.redirect('/');
  });

// route middleware to make sure
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
  return next();

// if they aren't redirect them to the home page
}
res.redirect('/');

module.exports = router;
