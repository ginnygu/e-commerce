const express = require('express');
const router = express.Router();
let categoryValidation = require('./utils/categoryValidation')
let categoryController = require('../products/controllers/categoryController')

let createProductController = require('./controllers/createProductController');

router.get('/add-category', function(req, res){
    res.render('products/addcategory', {errors: req.flash('addCategoryError'), success: req.flash('addCategorySuccess')})
})

router.post('/add-category', categoryValidation, function(req, res){
   categoryController.addCategory(req.body)
        .then( category => {
            req.flash('addCategorySuccess', `Added ${category.name}`)
            res.redirect('/api/admin/add-category')
        })
        .catch( error =>{
            console.log(error)
            req.flash('addCategoryError', error.message )
            res.redirect('/api/admin/add-category')
        })
})

router.get('/get-all-categories', categoryController.getAllCategories)

router.get('/create-fake-product/:name/:id', createProductController.createProductByCategoryID)

module.exports = router;