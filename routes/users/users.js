const express = require('express');
const router = express.Router();
const passport = require('passport')

let userController = require('../users/controllers/userController')
let cartController = require('../cart/controllers/cartController')
let signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hey class!!!');
});

router.get('/signup', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    res.render('auth/signup', { errors: req.flash('errors'), error_msg: null })
});

router.post('/signup', signupValidation, userController.signup, cartController.createUserCart)

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
})

router.get('/signin', function (req, res) {
    if(req.isAuthenticated()){
      res.redirect('/');
    }
    res.render('auth/signin', {errors: req.flash('loginMessage')})
})

router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/signin',
  failureFlash: true
}))

router.get('/edit-profile', function(req, res){
  console.log('you touched it')
  if(!req.isAuthenticated()){
    res.redirect('/api/users/signin')
   
  }
  res.render('account/profile', {
    errors: req.flash('errors'),
    success: req.flash('success')
  })
})

router.put('/edit-profile', function(req, res){
  userController.updateProfile(req.body, req.user._id)
    .then(user =>{
      req.flash('success', 'successfully  updated')
      res.redirect('/api/users/edit-profile')
    })
    .catch( error =>{
      req.flash('error', 'did not update');
      res.redirect('/api/users/edit-profile')
    })
})

router.delete('/edit-profile', function(req, res){
  res.send("delete worked")
})

module.exports = router;
