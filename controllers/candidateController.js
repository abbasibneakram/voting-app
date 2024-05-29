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
            res.status(404).json({ message: "You don't have admin role" })
        } else {
            const candidateData = req.body
            const newCandidate = new Candidate(candidateData)
            const response = await newCandidate.save()

            res.status(201).json({ data: response })
            console.log('Candidate Added')
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateCandidate = async (req, res) => {
    try {
        if (!(await checkAdmin(req.user.id))) {
            res.status(404).json({ message: "You don't have admin role" })
        } else {
            const candidateId = req.params.id
            const updatedData = req.body
            console.log(updatedData, 'updatedData')
            if (!updatedData)
                res.status(404).json({ message: 'Updating data not found' })
            else {
                const response = await Candidate.findByIdAndUpdate(
                    candidateId,
                    updatedData,
                    {
                        new: true, //retrun updated content
                        runValidators: true, //run mongoose validations
                    }
                )
                if (!response)
                    res.status(404).json({ message: 'candidate not found!' })
                res.status(200).json({ data: response })
                console.log('Candidate Data updated')
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

module.exports = { addCandidate, updateCandidate }
