const {Category} = require('../models/category')
const express = require('express');
const router = express.Router();

router.post(`/`, (req, res)=>{
    const category = new Category({
        name : req.body.name
    })
    category.save().then((createdCategory => {
        res.status(201).json(createdCategory)
    })).catch((err)=>{
        res.status(500).json({
            error : err,
            success : false
        })
    })
})

router.get(`/`, async(req, res)=>{
    const cat = await Category.find();
    if(!cat){
        res.status(500).json({
            success: false
        })
    }
    res.send(cat);
});

router.get('/:id', async(req, res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({
            message : 'Category with id not found'
        });
    }
    res.status(200).send(category);
})

router.put('/:id', async(req, res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id,
        {
            name : req.body.name
        },
        {new : true});
        if(!category){
            res.status(500).json({
                message : 'Category with id not found'
            });
        }
        res.status(200).send(category);
})

module.exports = router;