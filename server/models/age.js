const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const ageRangeSchema = MongoSchema({
    email:String,
    minAge: Number,
    maxAge: Number,
})

module.exports = mongoose.model('AgeRange', ageRangeSchema)
