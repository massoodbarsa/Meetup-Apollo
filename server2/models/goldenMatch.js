const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const goldenMatchSchema = MongoSchema({

    url: String,
    userId: String
})

module.exports = mongoose.model('Photo', goldenMatchSchema)