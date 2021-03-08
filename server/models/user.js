const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const userSchema = MongoSchema({

    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    surename: String,
    age: Number,
    profilePhoto: String,
    ticket: Number,
    gender: String,
    aboutMe: String
})

module.exports = mongoose.model('User', userSchema)