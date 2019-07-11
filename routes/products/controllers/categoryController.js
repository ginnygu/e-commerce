let Category = require('../models/Category');

module.exports = {
    addCategory: (params) => {
        return new Promise((resolve, reject) => {
            let category = new Category();
            category.name = params.category
            category.save()
                .then(category => {
                    resolve(category)
                })
                .catch(error => {
                    let errors = {};
                    errors.confirmation = false

                    if (error.code === 11000) {
                        errors.message = 'Category already exists'


                    } else {
                        errors.message = error
                    }
                    reject(errors)
                })
        })
    },
    getAllCategories: function (req, res) {
            Category.find({})
                .then(categories => {
                    res.render('products/create-fake-product', { categories: categories , success: req.flash('createProductsSuccess'), errors: req.flash('erros')})
                })
                .catch(error => {
                    res.render('products/create-fake-product', {errors: error })
                })
    }
}