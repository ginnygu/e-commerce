const express = require('express');
const router = express.Router();
const cartController = require('./controllers/cartController');
const stripe = require('stripe')('sk_test_ZP3ZlaxCYS67AD7jJcIDUSjU00g27VWR22')
const async = require('async') ;
let Carts = require('./models/Carts')
let User = require('../users/models/User')

router.get('/', cartController.getUserShoppingCart)
router.post('/product', cartController.addProductToCart)
router.delete('/remove', cartController.removeFromCart)
router.post('/payment', (req, res, next)=>{
    let stripeToken = req.body.stripeToken;
    let currentCharges = req.body.stripeMoney * 100;

    stripe.customers
        .create({
            source: stripeToken
        })
        .then( customer =>{
            let results = stripe.charges.create({
                amount: currentCharges,
                currency: 'usd',
                customer: customer.id
            })
            return results
        })
        .then( results => {
            async.waterfall([
                (callback)=> {
                    Carts.findOne({ 
                        owner: req.user._id 
                    }, (error, cart)=>{
                        callback(error,cart)
                    })
                },
                (cart, callback) =>{
                    User.findOne({ 
                        _id: req.user._id 
                    }, (error, user)=>{
                        if(user){
                            for(let i = 0; i< cart.items.length; i++){
                                user.history.push({
                                    item: cart.items[i].item,
                                    paid: cart.items[i].price
                                })
                            }
                            user.save((error, user)=>{
                                if(error) return next(error)
                                callback(error, user)
                            })
                        }
                    })
                },
                (user)=>{
                    Carts.update({
                        owner: req.user._id
                    }, {
                        $set: {
                            items: [],
                            total: 0
                        }
                    }, (error, updated) =>{
                        if(updated) res.send('Payment done Successfully')
                    })
                }
            ])
        })
        .catch((error)=>{
            let errors = {}
            errors.status = 500
            errors.message = error

            res.json(errors)
        })
})

module.exports = router;
