const express = require('express')
const app = express()
const db = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')

require('dotenv').config

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    console.log('Hello World')
})
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/candidate', candidateRoutes)
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

server.on('error', (err) => {
    console.error('Server startup error:', err.message)
})
