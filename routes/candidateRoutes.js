const express = require('express')
const router = express.Router()
const jwtAuthMiddleware = require('./../middlewares/authMiddleware')
const {
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidates,
} = require('./../controllers/candidateController')

router.get('/', getCandidates)
router.use(jwtAuthMiddleware)
router.post('/addCandidate', addCandidate)
router.put('/:id', updateCandidate)
router.delete('/:id', deleteCandidate)

module.exports = router
