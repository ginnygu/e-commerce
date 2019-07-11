let Product = require('../models/Products');
let paginate = require('../utils/pagination')

module.exports = {
    getAllProducts: function (params) {
        return new Promise((resolve, reject) => {
            Product.find({})
                .then(products => {
                    resolve(products)
                })
                .catch(error => {
                    let errors = {};
                    errors.status = 500
                    errors.message = error
                    reject(errors)
                })
        })
    },
    getProductByID: function (id) {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(item => {
                    resolve(item)
                })
                .catch(error => {
                    let errors = {};
                    errors.status = 500
                    errors.message = error
                    reject(errors)
                })
        })
    },
    getProductsByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            Product.find({
                    category: id
                })
                .populate('category')
                .exec()
                .then(product => {
                    resolve(product)
                })
                .catch(error => {
                    let errors = {}
                    errors.status = 500
                    errors.message = error
                    reject(errors)
                })
        })
    },
    getPageIfUserLoggedIn: (req, res, next) => {
        if (req.user) paginate(req, res, next)
        else res.render('index')
    },
    searchProductByQuery: function (req, res) {
        if(req.query.q){
            Product.search({
                query_string: {
                    query: req.query.q
                }
            }, (err, result) => {
                if (err) {
                    let errors = {}
                     errors.status = 500
                     errors.message = err
                     res.status(errors.status).json(errors)
                } else {
                    let data = result.hits.hits
                    res.render('search/search-result', { 
                        products: data,
                        query: req.query.q
                    })
                }
            })
        }
    },
    instantSearch: (req, res)=>{
        Product.search({
            query_string: {
                query: req.body.search_term
            }
        }, (error, result)=>{
            if(error){
                let errors = {}
                errors.status = 500
                errors.message = error

                res.status(errors.status).json(errors)
            } else {
                res.json(result)
            }
        })
    }
}