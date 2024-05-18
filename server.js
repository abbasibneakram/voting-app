const express = require('express')
const app = express()
require('dotenv').config

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

server.on('error', (err) => {
    console.error('Server startup error:', err.message)
})
