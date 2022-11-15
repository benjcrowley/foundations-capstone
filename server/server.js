const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const Sequelize = require('sequelize')
require('dotenv').config()
const { getHighScores, newHighScore} = require('./controller.js')
const CONNECTION_STRING = process.env.CONNECTION_STRING
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

app.use(express.json())

// endpoints to serve the files
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.js'))
})
app.get('/styles', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/style.css'))
})
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



app.get('/scores', getHighScores)
app.post('/scores', newHighScore)

const PORT = process.env.PORT || 4020

app.listen(PORT, () => console.log(`running on port ${PORT}`))