let Cart = require('../models/Carts');
module.exports = {
    createUserCart: (req, res) => {
        let cart = new Cart();
        cart.owner = req.user._id

        cart.save((error) => {
            if (error) {
                let errors = {}
                errors.status = 500
                errors.message = error
                res.status(errors.status).json(errors)
            } else {
                res.redirect('/')
            }
        })
    },
    addProductToCart: (req, res) => {
        Cart.findOne({
                owner: req.user._id
            })
            .then(cart => {
                cart.items.push({
                    item: req.body.productID,
                    price: parseFloat(req.body.priceValue),
                    quantity: parseInt(req.body.quantity)
                })
                cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2)
                cart.save()
                    .then(cart => {
                        res.redirect('/api/cart')
                    })
                    .catch(error => {
                        let errors = {}
                        errors.status = 400
                        errors.message = error
                        res.status(errors.status).json(errors)
                    })
            })
            .catch(error => {
                let errors = {}
                errors.status = 400
                errors.message = error
                res.status(errors.status).json(errors)

            })
    },
    getUserShoppingCart: (req, res) => {
        if (!req.user) res.redirect('/api/user/signup');
        Cart.findOne({
                owner: req.user._id
            })
            .populate('items.item')
            .exec()
            .then((cart) => {
                res.render('cart/cart', {
                    foundCart: cart,
                    message: req.flash('remove')
                })
            })
            .catch(error => {
                let errors = {}
                errors.status = 400
                errors.message = error

                res.status(errors.status).json(errors)
            })
    },
    removeFromCart: (req, res) => {
        Cart.findOne({
                owner: req.user._id
            })
            .then(cart => {
                cart.items.pull(String(req.body.item))

                cart.total = (cart.total - parseFloat(req.body.price).toFixed(2))

                cart.save()
                    .then((cart)=>{
                        req.flash('remove', 'Successfully removed')
                        res.redirect('/api/cart')
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.status = 400
                        errors.message = error

                        res.status(errors.status).json(errors)
                    })
            })
            .catch(error =>{
                let errors = {}
                errors.status = 400
                errors.message = error
                res.status(errors.status).json(errors)
            })
    }

}