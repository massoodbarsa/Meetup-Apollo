const graphql = require('graphql')
const schema = require('../../schema')
const Abonnement = require('../../../models/abonnement')


const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql

const {
  AbonnementType
} = schema

const abonnementMutation = {

  addAbonnement: {
    type: AbonnementType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
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
      }
    },
    async resolve(parent, args) {
      const abonnement = await Abonnement.find({
        email: args.email
      })

      try {
        if (abonnement.length === 0) {
          let abonnement = new Abonnement({
            email: args.email,
            type: args.type,
            price: args.price,
            startDate: args.startDate,
            days: args.days
          });
          return abonnement.save()
        }

      } catch (error) {
        throw new Error('ridi')
        console.log(error);
      }

    }
  },
}

module.exports = abonnementMutation
