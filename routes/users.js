require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const getUser = require('./getObj')

//Getting all
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        return res.json(users)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getUser(User), (req, res) => {
    res.json(res.obj)
})


//Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name
    })

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET)

    user.accessToken = accessToken

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/:id', getUser(User), async (req, res) => {
        //Updating name
    if(req.body.name != null){
        res.obj.name = req.body.name
    }

    //Update to db
    try{
        const updatedUser = await res.obj.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

//Deleting one
router.delete('/:id', getUser(User), async (req, res) => {
    try{
        //Delete a user
        await res.obj.remove()
        res.json({ message: 'Deleted User' })

    }catch(err){
        res.status(500).json({ message: err.message })
    }
})



//Export router
module.exports = router