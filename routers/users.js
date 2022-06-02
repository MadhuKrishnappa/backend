const {User} = require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { route } = require('./products');
const jwt = require('jsonwebtoken');

router.post(`/`, (req, res)=>{
    const user = new User({
        name : req.body.name,
        username : req.body.username,
        passwordHash : bcrypt.hashSync(req.body.password, 10),
        phone :req.body.phone,
        isAdmin:req.body.isAdmin,
        email:req.body.email
    })
    user.save().then((createdUser => {
        res.status(201).json(createdUser)
    })).catch((err)=>{
        res.status(500).json({
            error : err,
            success : false
        })
    })
})

router.get(`/`, async(req, res)=>{
    const user = await User.find().select('-passwordHash');
    if(!user){
        res.status(500).json({
            success: false
        })
    }
    res.send(user);
});

router.get(`/:id`, async(req, res)=>{

    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        res.status(500).json({
            success: false
        })
    }
    res.send(user);
});

router.post('/login', async(req, res) => {
    const user = await User.findOne({username : req.body.username});
    if(!user){
        return res.status(400).send({success : false, message :'Invalid UserName'});
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
            userId :user.id
            },
            'spiceeguru',
            {expiresIn : '1d'}
        )
        return res.status(200).send({username : user.username, token : token});
    }
     return res.status(400).send({success : false, message :'Invalid Credentials'});
    
});

module.exports = router;