const Favorite = require('../../../models/favorites')
const schema = require('../../schema')
const { FavoriteType } = schema
const graphql = require('graphql')
const {
  GraphQLString,
  GraphQLNonNull
} = graphql

const favoriteMutation = {
  addFavorites: {
    type: FavoriteType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      favoriteEmail: {
        type: new GraphQLNonNull(GraphQLString)
      },

    },
    resolve(parent, args) {
      let favorite = new Favorite({
        email: args.email,
        favoriteEmail: args.favoriteEmail,
      });
      return favorite.save()
    }
  },

}

module.exports = favoriteMutation
