const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    quizId:{
        type: String,
        required: true
    },
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

module.exports = mongoose.model('Stat', statSchema)