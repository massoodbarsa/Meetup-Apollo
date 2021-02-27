const graphql = require('graphql')
const schema = require('../schema')
const User = require('../../models/user')
const Favorites = require('../../models/favorites')
const Images = require('../../models/image')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = graphql


const { UserType, FavoriteType, AbonnementType, GoldenMatchType, PhotoType } = schema


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({

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

            },
            async resolve(parent, args) {

                const existUser = await User.findOne({ email: args.email })

                console.log(existUser);
                let user
                try {
                    if (!existUser) {
                        console.log(existUser);
                        user = new User({
                            email: args.email,
                            password: args.password,
                            name: args.name,
                            surename: args.surename,
                            age: args.age,
                            profilePhoto: args.profilePhoto
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


        addPhoto: {
            type: PhotoType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                url: {
                    type: new GraphQLNonNull(GraphQLString)
                },

            },
            resolve(parent, args) {
                console.log(args.url)
                let photo = new Images({
                    email: args.email,
                    url: args.url,
                });
                return photo.save()
            }
        },

        deletePhoto: {
            type: PhotoType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                url: {
                    type: new GraphQLNonNull(GraphQLString)
                },

            },
            resolve(parent, args) {
                return Images.deleteOne({
                    "email": args.email,
                    "url": args.url

                })

            }
        },

        addProfilePhoto: {
            type: UserType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                profilePhoto: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                return new Promise((resolve, reject) => {
                    const date = Date().toString()
                    User.findOneAndUpdate({
                        "email": args.email
                    }, {
                        "$set": {
                            profilePhoto: args.profilePhoto
                        }
                    }, {
                        "new": true
                    } //returns new document
                    ).exec((err, res) => {
                        console.log('test', res)
                        if (err) reject(err)
                        else resolve(res)
                    })
                })

            }
        },

        addAbonnement: {
            type: AbonnementType,
            args: {
                userId: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                price: {
                    type: GraphQLInt
                },
                discount: {
                    type: GraphQLInt
                },
                tickets: {
                    type: GraphQLInt
                },
                startDate: {
                    type: GraphQLString
                },
                days: {
                    type: GraphQLInt

                }

            },
            resolve(parent, args) {
                let abonnement = new Abonnement({
                    userId: args.userId,
                    name: args.name,
                    price: args.price,
                    discount: args.discount,
                    tickets: args.tickets,
                    startDate: args.startDate,
                    days: args.days
                });
                return abonnement.save()

            }
        }
    })
})
module.exports = Mutation

