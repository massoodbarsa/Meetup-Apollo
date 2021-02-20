const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const imageSchema = MongoSchema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    url: String,
})

module.exports = mongoose.model('Image', imageSchema)