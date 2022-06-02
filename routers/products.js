const {Product} = require('../models/product')
const express = require('express');
const router = express.Router();

router.post(`/`, (req, res)=>{
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        image : req.body.image,
        category : req.body.category,
        isFeatured : req.body.isFeatured,
        countInStock : req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error : err,
            success : false
        })
    })
})

router.get(`/`, async(req, res)=>{
    let filter = {};
    if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    }
    const menu = await Product.find(filter).populate('category');
    if(!menu){
        res.status(500).json({
            success: false
        })
    }
    res.send(menu);
});

module.exports = router;