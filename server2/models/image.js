const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const imageSchema = MongoSchema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // },
    user:String,
    url: String,
})

module.exports = mongoose.model('Image', imageSchema)