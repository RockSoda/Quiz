require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
const statsRouter = require('./routes/stats')
const quizRouter = require('./routes/quizzes')

app.use('/users', usersRouter)   //url: localhost:3000/users
app.use('/stats', statsRouter)  //url: localhost:3000/stats
app.use('/quizzes', quizRouter) //url: localhost:3000/quizzes

//Enable CORS
express.Router().use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, PATCH, DELETE, Content-Type, Accept")
    next()
})

app.listen(3000, () => console.log('Server Started'))