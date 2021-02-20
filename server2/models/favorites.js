const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const favoriteSchema = MongoSchema({
    favoriteId:String,
    userId: String
})

module.exports = mongoose.model('Favorite', favoriteSchema)