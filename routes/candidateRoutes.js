const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('./../middlewares/authMiddleware')
const {
    addCandidate,
    updateCandidate,
    deleteCandidate,
} = require('./../controllers/candidateController')

router.use(jwtAuthMiddleware)
router.post('/', addCandidate)
router.put('/:id', updateCandidate)
router.delete('/:id', deleteCandidate)

module.exports = router
