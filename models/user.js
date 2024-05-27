const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    cnic: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'voter'],
        default: 'voter',
    },
    hasVoted: {
        type: Boolean,
        default: false,
    },
})

userSchema.pre('save', async function (next) {
    const user = this
    //hash only if new user or current password is changed
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next()
    } catch (err) {
        console.log(err)
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
