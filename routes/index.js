var express = require('express');
var router = express.Router();
let productController = require('../routes/products/controllers/productController')
let paginate = require('./products/utils/pagination')

/* GET home page. */
router.get('/', productController.getPageIfUserLoggedIn)
router.get('/page/:page',   paginate)

router.post('/testJquery', (req, res)=>{
    console.log(req.body)
    res.send({ result: 'success'})
})
router.get('/test', function (req,res){
    res.render('test')
})

module.exports = router;
