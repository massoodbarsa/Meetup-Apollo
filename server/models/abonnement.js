const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const abonnementSchema = MongoSchema({
    email: String,
    type: String,
    price: Number,
    startDate: String,
    days: Number
})

module.exports = mongoose.model('Abonnement', abonnementSchema)