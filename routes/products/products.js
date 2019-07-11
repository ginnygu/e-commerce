const express = require('express');
const router = express.Router();
let productController = require('./controllers/productController');
let Product = require('./models/Products')

Product.createMapping(function(error,  mapping){
    if(error){
        console.log("error creating  mapping")
        console.log(mapping)
    }else{
        console.log("Mapping created")
        console.log(mapping)
    }
})

let  stream = Product.synchronize();
let count  =  0;

stream.on('data', function(){
    count++
})
stream.on('close', function(){
    console.log(`indexed  ${count}`)
})
stream.on('error', function(error){
    console.log(error)
})

router.get('/getproductsbycategoryid/:id', function(req,res){
    productController.getProductsByCategoryID(req.params.id)
        .then(products =>{
            res.render('products/products', {products: products})
        })
        .catch(error=>{
            res.status(error.status).json(error)
        })
})

router.post('/search', function (req,res){
    res.redirect(`/api/product/search?q=${req.body.q}`)
})

router.get('/search', productController.searchProductByQuery)

router.post('/instant-search', productController.instantSearch)

router.get('/:id', function(req, res){
    productController.getProductByID(req.params.id)
        .then(item =>{
            res.render('products/product', { item: item })
        })
        .catch(error =>{
            res.status(error.status).json(error)
        })
})



module.exports = router;