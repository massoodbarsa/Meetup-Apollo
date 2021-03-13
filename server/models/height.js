const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const heightRangeSchema = MongoSchema({
    email:String,
    minHeight: Number,
    maxHeight: Number,
})

module.exports = mongoose.model('HeightRange', heightRangeSchema)
