const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const preferencesSchema = MongoSchema({
    email: String,
    gender: String,
    location: String,
})

module.exports = mongoose.model('Preference', preferencesSchema)
