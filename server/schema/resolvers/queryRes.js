
const { UserType ,AbonnementType,PhotoType,FavoriteType,GoldenMatchType} = require('../schema')
const graphql = require('graphql')
const User = require('../../models/user')



const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull

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
        login: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return User.findOne({
                    email: args.email,
                    password: args.password
                })
            }
        },

    })
})

module.exports = RootQuery