const mongoose = require('mongoose');
let mongoosastic = require('mongoosastic');

let ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        es_type: 'nested',
        es_include_in_parents: true
    },
    name: { type: String, es_type: 'text', default: '' },
    price: { type: Number, es_type: 'long', default: 0 },
    image: { type: String, es_type: 'text', default: '' }
})

ProductSchema.plugin(mongoosastic, {
    hosts: [
        "https://5vd1xd2o7j:mkvuoot7rt@olive-123881908.us-east-1.bonsaisearch.net:443"
    ],
    populate: [
        {
            path: 'category'
        }
    ]
})

module.exports = mongoose.model('product', ProductSchema)