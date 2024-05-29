const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('./../middlewares/authMiddleware')
const {
    addCandidate,
    updateCandidate,
    // profile,
    // updatePassword,
} = require('./../controllers/candidateController')

//POST route to add user
router.post('/', jwtAuthMiddleware, addCandidate)
router.put('/:id', jwtAuthMiddleware, updateCandidate)

// router.post('/login', login)
// router.get('/profile', jwtAuthMiddleware, profile)
// router.patch('/profile/password', jwtAuthMiddleware, updatePassword)

module.exports = router
