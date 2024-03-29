const { UserType } = require('../schema')
const graphql = require('graphql')
const User = require('../../models/user')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    getUser: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    getUsers: {
      type: GraphQLList(UserType),
      resolve() {
        return User.find()
      }
    },
  })
})

module.exports = RootQuery
