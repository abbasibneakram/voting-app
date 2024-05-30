const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('./../middlewares/authMiddleware')
const { castVote, countVote } = require('./../controllers/voteController')

router.post('/:id', jwtAuthMiddleware, castVote)
router.get('/', countVote)

module.exports = router
