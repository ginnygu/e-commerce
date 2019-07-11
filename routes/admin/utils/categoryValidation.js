function categoryValidation(req, res, next){
    req.checkBody('category', 'category is required').notEmpty();

    let errors = req.validationErrors()

    if (errors) {
        req.flash('addCategoryError', errors[0].message)
        res.status(302).redirect('/api/admin/add-category')
    } else{
        next();
    }
    
}

module.exports = categoryValidation;