
const RootQuery = require('./queryRes')
const Mutation = require('./mutationRes')
const graphql = require('graphql')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull

} = graphql

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})