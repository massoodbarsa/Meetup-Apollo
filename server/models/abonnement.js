const mongoose = require('mongoose')
const MongoSchema = mongoose.Schema

const abonnementSchema = MongoSchema({
    userId: String,
    name: String,
    price: Number,
    discount: Number,
    tickets: Number,
    startDate: String,
    days: Number

})

module.exports = mongoose.model('Abonnement', abonnementSchema)