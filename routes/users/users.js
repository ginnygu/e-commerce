var express = require('express');
var router = express.Router();
let userController = require('../users/controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signup', function(req, res){
  res.render('auth/signup', {errors: []})
})
router.post('/signup', function(req, res){
  userController.signup(req.body)
    .then(user => {
      res.redirect('/')
    })
    .catch( error => {
      console.log(error)
    })
})


module.exports = router;
