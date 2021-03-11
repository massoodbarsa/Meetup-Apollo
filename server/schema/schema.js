const graphql = require('graphql')
const User = require('../models/user')
const Favorites = require('../models/favorites')
const GoldenMatch = require('../models/goldenMatch')
const Abonnement = require('../models/abonnement')
const Images = require('../models/image')


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull

} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({

    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
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
    gender: {
      type: GraphQLString
    },
    aboutMe: {
      type: GraphQLString
    },
    place: {
      type: GraphQLString
    },


    abonnement: {
      type: GraphQLList(AbonnementType),
      resolve(parent, args) {
        return Abonnement.find({
          email: parent.email
        })
      }

    },
    photos: {
      type: GraphQLList(PhotoType),
      resolve(parent, args) {
        return Images.find({
          email: parent.email
        })
      }
    },

    favorites: {
      type: GraphQLList(FavoriteType),
      resolve(parent, args) {
        return Favorites.find({
          userId: parent.id
        })
      }
    },

    goldenMatches: {
      type: GraphQLList(GoldenMatchType),
      resolve(parent, args) {
        return GoldenMatch.find({
          userId: parent.id
        })
      }
    }

  })
})

const AbonnementType = new GraphQLObjectType({
  name: 'Abonnement',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    price: {
      type: GraphQLInt
    },
    startDate: {
      type: GraphQLString
    },
    days: {
      type: GraphQLInt
    },

  })
})

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
  })
})

const FavoriteType = new GraphQLObjectType({
  name: 'Favorite',
  fields: () => ({

    userId: {
      type: GraphQLString
    },
    favoriteId: {
      type: GraphQLString
    },
    user: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({
          _id: parent.favoriteId,
        })
      }
    },

  })
})

const GoldenMatchType = new GraphQLObjectType({
  name: 'GoldenMatch',
  fields: () => ({
    id: {
      type: GraphQLInt
    },

  })
})


module.exports = {
  UserType,
  PhotoType,
  AbonnementType,
  GoldenMatchType,
  FavoriteType
}
