const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const getQuiz = require('./getObj')
const auth = require('./auth')

//Getting all
router.get('/', async (req, res) => {
    try{
        const quiz = await Quiz.find()
        return res.json(quiz)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting all quizzes under a user
router.get('/myQuizzes', auth, async (req, res) => {
    try{
        const quizzes = await Quiz.find()
        return res.json(quizzes.filter(quiz => (quiz.userId+"").localeCompare(req.user._id) === 0))
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})


//Creating one
router.post('/', auth, async (req, res) => {
    if((req.body.userId+"").localeCompare(req.user._id+"") !== 0) return res.status(403).json({ message: "Authorization Failed" })

    const quiz = new Quiz({
        userId: req.body.userId,
        userName: req.body.userName,
        name: req.body.name,
        questions: req.body.questions
    })

    try{
        const newQuiz = await quiz.save()
        res.status(201).json(newQuiz)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/:id', getQuiz(Quiz), auth, async (req, res) => {
    if((res.obj.userId+"").localeCompare(req.user._id+"") !== 0) return res.status(403).json({ message: "Authorization Failed" })

    if(req.body.name != null){
        res.obj.name = req.body.name
    }

    if(req.body.questions != null){
        res.obj.questions = req.body.questions
    }

    //Update to db
    try{
        const updatedQuiz = await res.obj.save()
        res.json(updatedQuiz)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

//Deleting one
router.delete('/:id', getQuiz(Quiz), auth, async (req, res) => {
    if((res.obj.userId+"").localeCompare(req.user._id+"") !== 0) return res.status(403).json({ message: "Authorization Failed" })

    try{

        await res.obj.remove()
        res.json({ message: 'Deleted Quiz' })

    }catch(err){
        res.status(500).json({ message: err.message })
    }
})



module.exports = router