

const userMutation = require('./userMutation.js')
const favoriteMutation = require('./favoriteMutation')
const photoMutation = require('./photoMutation')
const preferenceMutation = require('./preferenceMutation')
const abonnementMutation = require('./abonnementmutation')
const graphql = require('graphql')

const {
  GraphQLObjectType,
} = graphql


const Mutation = new GraphQLObjectType({

  name: 'Mutation',
  fields: () => ({
    ...userMutation,
    ...abonnementMutation,
    ...favoriteMutation,
    ...preferenceMutation,
    ...photoMutation,
    ...abonnementMutation
  })
})
module.exports = Mutation
