const express = require('express')
const router = express.Router()
const User = require('./../models/user')
const jwtAuthMiddleware = require('./../middlewares/authMiddleware')
const {
    signup,
    login,
    profile,
    updatePassword,
} = require('./../controllers/userController')

//POST route to add user
router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', jwtAuthMiddleware, profile)
router.patch('/profile/password', jwtAuthMiddleware, updatePassword)

module.exports = router
