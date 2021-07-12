const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const favoriteSchema = MongoSchema({

    email: String,
    favoriteEmail: String

})

module.exports = mongoose.model('Favorite', favoriteSchema)