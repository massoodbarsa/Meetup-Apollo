
const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs/index')
const mongoose = require('mongoose')
const consola = require('consola')

const server = new ApolloServer({ typeDefs, resolvers });

const startApp = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.rkikv.mongodb.net/persiandating_apollo?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    consola.success({
      message: `connected to the database \n${process.env.DB}`,
      badge: true
    })
    server.listen()
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      })


  } catch (error) {

  }
}

startApp()




