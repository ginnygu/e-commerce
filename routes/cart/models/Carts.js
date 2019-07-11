const mongoose = require('mongoose');

let CartSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    total: { type: Number, default: 0 },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
    }]
})

module.exports = mongoose.model('cart', CartSchema)