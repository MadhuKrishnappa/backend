const {Order} = require('../models/order')
const express = require('express');
const router = express.Router();

router.post(`/`, (req, res)=>{
    const order = new Order({
        name : req.body.name
    })
    order.save().then((createdOrder => {
        res.status(201).json(createdOrder)
    })).catch((err)=>{
        res.status(500).json({
            error : err,
            success : false
        })
    })
})

router.get(`/`, async(req, res)=>{
    const order = await Order.find();
    if(!order){
        res.status(500).json({
            success: false
        })
    }
    res.send(order);
});

module.exports = router;