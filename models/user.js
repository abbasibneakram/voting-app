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

const User = mongoose.model('User', userSchema)
module.exports = User
