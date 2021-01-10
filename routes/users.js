const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Enable CORS
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, PATCH, DELETE, Content-Type, Accept")
    next()
})

//Getting all
router.get('/', async (req, res) => {
    try{
        const users = await User.find()

        //Getting all users
        if(typeof(req.query.query) == "undefined"){
            return res.json(users)
        }

        //Getting all quizzes
        if(req.query.query.localeCompare("quiz") === 0){
            quizzes = []
            for(let i = 0; i < users.length; i++){
                for(let j = 0; j < users[i].quiz.length; j++){
                    //Create quiz object
                    let quizObj = {
                        quizId: users[i].quiz[j]._id,
                        name: users[i].quiz[j].name,
                        questions: users[i].quiz[j].questions,
                        author: users[i].name
                    }
                    quizzes.push(quizObj)
                }
            }
            return res.json(quizzes)
        }else

        //Getting a quiz for a given quiz id
        {
            for(let i = 0; i < users.length; i++){
                for(let j = 0; j < users[i].quiz.length; j++){
                    if((users[i].quiz[j]._id+"").localeCompare(req.query.query) === 0){
                        return res.json(users[i].quiz[j])
                    }
                }
            }

            return res.status(404).json({ message: 'Cannot find quiz' })
        }
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting attempts or quizzes from a user based on query
router.get('/:id', getUser, (req, res) => {
    //Getting user without query
    if(typeof(req.query.query) == "undefined"){
        return res.json(res.user)
    }

    //Getting quizzes from a user
    if(req.query.query.localeCompare("quiz") === 0){
        return res.json(res.user.quiz)
    }

    //Getting attempts from a user
    if(req.query.query.localeCompare("attempted") === 0){
        return res.json(res.user.attempted)
    }

    res.json(res.user)
})


//Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        quiz: req.body.quiz,
        attempted: req.body.attempted
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Updating one
router.patch('/:id', getUser, async (req, res) => {

    //If query is empty
    if(typeof(req.query.query) == "undefined"){
        //Updating name
        if(req.body.name != null){
            res.user.name = req.body.name
        }

        //Updating quizzes
        if(req.body.quiz != null){
            res.user.quiz = req.body.quiz
        }

        //Updating attempts
        if(req.body.attempted != null){
            res.user.attempted = req.body.attempted
        }
    }else

    //Appending quiz
    if(req.query.query.localeCompare("quiz") === 0){
        //Checking if the quiz is empty
        if(req.body.quiz.length === 0) return res.status(422).json({ message: "Quiz cannot be empty!" })
        for(let i = 0; i < req.body.quiz.length; i++){
            //Checking if the quiz name is empty
            if(req.body.quiz[i].name == null || (req.body.quiz[i].name+"").localeCompare("") === 0)
                return res.status(422).json({ message: "Quiz name cannot be empty!" })
            //Checking if the quiz contains 0 question
            if(req.body.quiz[i].questions == null || req.body.quiz[i].questions.length === 0)
                return res.status(422).json({ message: "Question set cannot be empty!" })
            for(let j = 0; j < req.body.quiz[i].questions.length; j++){
                //Checking if any of the question in the quiz is empty
                if(req.body.quiz[i].questions[j].question == null || (req.body.quiz[i].questions[j].question+"").localeCompare("") === 0)
                    return res.status(422).json({ message: "Question cannot be empty!" })
                //Checking if any of the answer in the quiz is empty
                if(req.body.quiz[i].questions[j].answer == null || (req.body.quiz[i].questions[j].answer+"").localeCompare("") === 0)
                    return res.status(422).json({ message: "Answer cannot be empty!" })
            }
        }
        res.user.quiz = res.user.quiz.concat(req.body.quiz)
    }else

    //Appending attempts
    if(req.query.query.localeCompare("attempted") === 0){
        res.user.attempted = res.user.attempted.concat(req.body.attempted)
    }

    //Update to db
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})

//Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try{
        if(typeof(req.query.query) == "undefined"){
            //Delete a user
            await res.user.remove()
            res.json({ message: 'Deleted User' })
        }else{
            //Delete a quiz by id
            let quizzes = []
            let flag = false
            for(let i = 0; i < res.user.quiz.length; i++){
                if((res.user.quiz[i]._id+"").localeCompare(req.query.query) !== 0){
                    quizzes.push(res.user.quiz[i])
                }else{
                    flag = true
                } 
            }

            if(!flag) return res.status(404).json({ message: 'Cannot find quiz under current user' })

            res.user.quiz = quizzes
            const userAfterDeletion = await res.user.save()
            res.json(userAfterDeletion)

        }

    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

// Middle-ware
async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({ message: 'Cannot find user' })
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

//Export router
module.exports = router