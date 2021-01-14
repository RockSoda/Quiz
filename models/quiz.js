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
    userId:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
})

module.exports = mongoose.model('Quiz', quizSchema)