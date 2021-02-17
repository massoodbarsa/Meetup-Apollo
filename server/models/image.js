const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const imageSchema = MongoSchema({
    email: String,
    url: String,
})

module.exports = mongoose.model('Image', imageSchema)