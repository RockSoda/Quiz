const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
})
const attemptedSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    completion: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quiz: {
        type: [quizSchema]
    },
    attempted: {
        type: [attemptedSchema]
    }
})

/*
A 'user' data structure
{
    _id
    name

    quiz:[{
       _id
       name
 
       questions:[{
          
          _id
          question
          answer
 
       }]
    }]
 
    attempted:[{
 
       _id
       quizName
       completion
       Score
 
    }]
 
 }
 */

module.exports = mongoose.model('User', userSchema)