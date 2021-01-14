const express = require('express')
const router = express.Router()
const Stat = require('../models/stat')
const getStat = require('./getObj')
const auth = require('./auth')


//Getting all
router.get('/', async (req, res) => {
    try{
        const stat = await Stat.find()
        return res.json(stat)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting all under a user
router.get('/myStats', auth, async(req, res) => {
    try{
        const stats = await Stat.find()
        return res.json(stats.filter(stat => (stat.userId+"").localeCompare(req.user._id) === 0))
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Creating one
router.post('/', auth, async (req, res) => {
    if((req.body.userId+"").localeCompare(req.user._id+"") !== 0) return res.status(403).json({ message: "Authorization Failed" })

    const stat = new Stat({
        userId: req.body.userId,
        userName: req.body.userName,
        quizId: req.body.quizId,
        quizName: req.body.quizName,
        completion: req.body.completion,
        score: req.body.score
    })

    try{
        const newStat = await stat.save()
        res.status(201).json(newStat)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Deleting one
router.delete('/:id', getStat(Stat), auth, async (req, res) => {
    try{

        await res.obj.remove()
        res.json({ message: 'Deleted Stat' })

    }catch(err){
        res.status(500).json({ message: err.message })
    }
})



module.exports = router