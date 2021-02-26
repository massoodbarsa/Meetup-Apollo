const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const userSchema = MongoSchema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    surename: String,
    age: Number,
    profilePhoto: String,
    // photos: [{
    //     url: String,
    //     userID: String
    // }],

    photos:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },

})

module.exports = mongoose.model('User', userSchema)