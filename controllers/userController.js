const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

const signup = async (req, res) => {
    const data = req.body
    try {
        const newUser = new User(data)

        const response = await newUser.save()
        console.log('User added!')

        const payload = {
            id: newUser.id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.status(201).json({ data: response, token: token })
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
        if (!matchPassword)
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

const profile = async (req, res) => {
    try {
        const userData = req.user
        const user = await User.findById(userData.id)
        res.status(200).json({ user: user })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal server error!' })
    }
}

const updatePassword = async (req, res) => {
    try {
        const userData = req.user
        const user = await User.findById(userData.id)
        const { currentPassword, newPassword } = req.body
        const matchPassword = await bcrypt.compare(
            currentPassword,
            user.password
        )
        if (!matchPassword)
            return res.status(400).json({ error: 'Wrong Password' })

        user.password = newPassword
        const response = await user.save()
        console.log('Password Updated!')
        res.status(200).json({ success: 'Password Updated!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error!' })
    }
}
module.exports = { signup, login, profile, updatePassword }
