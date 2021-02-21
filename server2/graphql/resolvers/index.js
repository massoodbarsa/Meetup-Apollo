
const photoResolvers = require('./photo')
const userResolvers = require('./user')

module.exports = {
    Query: {
        ...photoResolvers.Query,
        ...userResolvers.Query
    }
    ,
    Mutation: {
        ...photoResolvers.Mutation,
        ...userResolvers.Mutation
    }
}