
const graphql = require('graphql')
const schema = require('../../schema')
const User = require('../../../models/user')

const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql

const {
  UserType,
} = schema


const userMutation = {

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

  addUser: {
    type: UserType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      surename: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      profilePhoto: {
        type: GraphQLString
      },
      gender: {
        type: GraphQLString
      },

    },
    async resolve(parent, args) {

      const existUser = await User.findOne({
        email: args.email
      })

      let user
      try {
        if (!existUser) {
          user = new User({
            email: args.email,
            password: args.password,
            name: args.name,
            surename: args.surename,
            age: args.age,
            profilePhoto: args.profilePhoto,
            gender: args.gender,
          });
        }
        if (user) {
          return user.save()
        }
      } catch (error) {
        throw error
      }
    }
  },

  updateUser: {
    type: UserType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      surename: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      profilePhoto: {
        type: GraphQLString
      },
      ticket: {
        type: GraphQLInt
      },
      aboutMe: {
        type: GraphQLString
      },
      place: {
        type: GraphQLString
      },
      height: {
        type: GraphQLInt
      },
    },

    async resolve(parent, args) {

      const user = await User.find({
        email: args.email
      })

      const lastTicket = user[0].ticket ? user[0].ticket : 0
      const NewTicket = args.ticket ? args.ticket : 0


      const updatedUser = await User.findOneAndUpdate({
        email: args.email
      }, {
        $set: {
          ...args,
          ticket: NewTicket + lastTicket
        }
      }, {
        new: true
      });
      return updatedUser
    }
  },
}
// })
// })

module.exports = userMutation
