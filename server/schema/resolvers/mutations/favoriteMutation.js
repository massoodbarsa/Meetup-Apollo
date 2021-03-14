
const Favorites = require('../../../models/favorites')
const schema = require('../../schema')
const { FavoriteType } = schema
const graphql = require('graphql')


const {
  GraphQLString,
  GraphQLNonNull
} = graphql

const favoriteMutation = {
  addFavorite: {
    type: FavoriteType,
    args: {
      favoriteId: {
        type: new GraphQLNonNull(GraphQLString)
      },
      userId: {
        type: new GraphQLNonNull(GraphQLString)
      },

    },
    resolve(parent, args) {
      let favorite = new Favorites({
        favoriteId: args.favoriteId,
        userId: args.userId,
      });
      return favorite.save()
    }
  },

}

module.exports = favoriteMutation
