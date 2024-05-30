const jwt = require('jsonwebtoken')
const User = require('./../models/user')
const Candidate = require('./../models/candidate')

const castVote = async (req, res) => {
    try {
        const candidateId = req.params.id
        const userId = req.user.id
        const candidate = await Candidate.findById(candidateId)
        if (!candidate)
            return res.status(404).json({ message: 'Candidate not found!' })
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        if (user.role == 'admin') {
            return res.status(403).json({ message: 'admin is not allowed' })
        }
        if (user.hasVoted)
            return res.status(403).json({ message: 'User has already voted!' })

        candidate.votes.push({ user: userId })
        candidate.voteCount++
        await candidate.save()

        user.hasVoted = true
        await user.save()
        return res
            .status(200)
            .json({ message: `Vote Casted to ${candidate.name} !` })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const countVote = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: 'desc' })
        const castedVotes = candidates.map((vote) => {
            return {
                party: vote.party,
                votes: vote.voteCount,
            }
        })

        res.status(200).send({ votes: castedVotes })
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}
module.exports = { castVote, countVote }
