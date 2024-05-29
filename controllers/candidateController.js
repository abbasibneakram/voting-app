const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')
const Candidate = require('./../models/candidate')

const checkAdmin = async (userId) => {
    try {
        const user = await User.findById(userId)
        return user.role === 'admin'
    } catch (err) {
        return err
    }
}
const addCandidate = async (req, res) => {
    try {
        if (!(await checkAdmin(req.user.id))) {
            return res
                .status(403)
                .json({ message: "You don't have admin role" })
        }

        const candidateData = req.body

        if (!candidateData || Object.keys(candidateData).length === 0) {
            return res
                .status(400)
                .json({ message: 'Candidate data is required' })
        }

        const newCandidate = new Candidate(candidateData)
        const response = await newCandidate.save()

        res.status(201).json({ data: response })
        console.log('Candidate Added')
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateCandidate = async (req, res) => {
    try {
        if (!(await checkAdmin(req.user.id))) {
            return res
                .status(403)
                .json({ message: "You don't have admin role" })
        }

        const candidateId = req.params.id
        const updatedData = req.body
        console.log(updatedData, 'updatedData')

        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res
                .status(400)
                .json({ message: 'No data provided to update' })
        }

        const response = await Candidate.findByIdAndUpdate(
            candidateId,
            updatedData,
            {
                new: true, // return updated document
                runValidators: true, // run mongoose validations
            }
        )

        if (!response) {
            return res.status(404).json({ message: 'Candidate not found!' })
        }

        res.status(200).json({ data: response })
        console.log('Candidate Data updated')
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const deleteCandidate = async (req, res) => {
    try {
        if (!(await checkAdmin(req.user.id))) {
            return res
                .status(403)
                .json({ message: "You don't have admin role" })
        }

        const candidateId = req.params.id
        const response = await Candidate.findByIdAndDelete(candidateId)

        if (!response) {
            return res.status(404).json({ message: 'Candidate not found!' })
        }

        res.status(200).json({
            message: `Candidate with ID ${candidateId} deleted successfully!`,
            data: response,
        })
        console.log('Candidate Deleted!')
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { addCandidate, updateCandidate, deleteCandidate }
