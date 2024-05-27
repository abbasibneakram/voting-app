const express = require('express')
const router = express.Router()
const User = require('./../models/user')
const { signup, login, update } = require('./../controllers/userController')

//POST route to add user
router.post('/signup', signup)

router.post('/login', login)

// router.patch('/update/:id', update)

module.exports = router
