const graphql = require('graphql')
const User = require('../models/user')
const Favorites = require('../models/favorites')
const GoldenMatch = require('../models/goldenMatch')
const Abonnement = require('../models/abonnement')
const Images = require('../models/image')
const Preference = require('../models/preferences')
const AgeRange = require('../models/age')
const HeightRange= require('../models/height')


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType

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
    height: {
      type: GraphQLInt
    },

    preferences: {
      type: GraphQLList(PreferencesType),
      resolve(parent, args) {
        return Preference.find({
          email: parent.email
        })
      }
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


const PreferencesType = new GraphQLObjectType({
  name: 'Preference',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    ageRange:{
      type: GraphQLList(AgeRangeType),
      resolve(parent, args) {
        return AgeRange.find({
          email: parent.email
        })
      }
    },
    heightRange: {
      type: GraphQLList(HeightRangeType),
      resolve(parent, args) {
        return HeightRange.find({
          email: parent.email
        })
      }
    },

  })
})

const AgeRangeType = new GraphQLObjectType({
  name: 'ageRange',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    minAge: {
      type: GraphQLInt
    },
    maxAge: {
      type: GraphQLInt
    },

  })
})

const HeightRangeType = new GraphQLObjectType({
  name: 'heightRange',
  fields: () => ({
    email: {
      type: GraphQLString
    },
    minHeight: {
      type: GraphQLInt
    },
    maxHeight: {
      type: GraphQLInt
    },

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
  FavoriteType,
  PreferencesType,
  AgeRangeType,
  HeightRangeType
}
