const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

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

const PORT = process.env.PORT || 4020

app.listen(PORT, () => console.log(`running on port ${PORT}`))