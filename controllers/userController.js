const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

const signup = async (req, res) => {
    const data = req.body
    try {
        const newUser = new User(data)

        const response = await newUser.save()
        console.log('User added!')

        res.status(201).json({ response: response })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

const login = async (req, res) => {
    const { cnic, password } = req.body
    try {
        const user = await User.findOne({ cnic: cnic })
        if (!user) return res.status(404).json({ error: 'User not found' })
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!user || !matchPassword)
            return res.status(400).json({ error: 'Invalid credentials' })

        const payload = {
            id: user.id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        console.log('User Logged in!')
        res.status(200).json({ sucess: true, token: token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

module.exports = { signup, login }
