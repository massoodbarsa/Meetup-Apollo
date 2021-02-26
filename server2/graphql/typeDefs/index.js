const { gql } = require('apollo-server');

module.exports = gql`

   type Query{
    # user(email:String,password:String): User
    users: [User!]!
    refreshToken: Auth!
    photos:[Photo]
  }

  type Mutation{
    login(email:String!,password:String!): User
    register(email:String,password:String,name:String):User
    addPhoto(url:String,userId:ID):Photo
    deletePhoto(url:String,userId:ID):Photo
    addProfilePhoto(url:String,userId:ID):Photo
  }


  type User{
    _id: ID
    name: String
    email: String
    password: String!
    surename: String
    age: Int
    profilePhoto: String
    abonnement:[Abonnement]
    photos: [Photo] 
    favorites: [Favorite]
    goldenMatches: [GoldenMatch]
  },

  type Auth{
    _id: ID
    token: String!
    refreshTokens: String!
    user:User
   
  }


  type Abonnement{
    _id: ID,
    name: String
    price: String!
    tickets: Int!
    discount: String
    age: Int
    startDate: String
    days: Int
    user:User
  },

  type Photo{
    _id: ID,
    url: String
    userId: String
    user:User
  },

  type Favorite{
    _id: ID,
    url: String
    user: User
    favoriteId: User

  },

  type GoldenMatch{
    _id: ID,
    url: String
    user: User
    goldenId: User

  },

 `