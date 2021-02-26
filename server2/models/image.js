const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const imageSchema = MongoSchema({
   
    userId:String,
    url: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports = mongoose.model('Image', imageSchema)