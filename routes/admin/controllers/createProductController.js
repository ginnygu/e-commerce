let Product = require('../../products/models/Products');
let faker = require('faker');

module.exports = {
    createProductByCategoryID:  (req, res)=>{
        for(let i = 0; i< 10; i++){
            let newProduct = new Product();
            newProduct.category = req.params.id
            newProduct.name = faker.commerce.productName()
            newProduct.price = faker.commerce.price()
            newProduct.image = faker.image.image()
        
            newProduct.save()
        }
            req.flash('createProductsSuccess', `fake ${req.params.name} created`)
            res.redirect('/api/admin/get-all-categories')
                

        
    } 
}