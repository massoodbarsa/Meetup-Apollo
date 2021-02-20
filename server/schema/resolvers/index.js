
const RootQuery = require('./queryRes')
const Mutation = require('./mutationRes')
const graphql = require('graphql')


const { GraphQLSchema } = graphql

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})