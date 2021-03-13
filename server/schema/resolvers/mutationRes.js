const graphql = require('graphql')
const schema = require('../schema')
const User = require('../../models/user')
const Favorites = require('../../models/favorites')
const Images = require('../../models/image')
const Abonnement = require('../../models/abonnement')
const Preferences = require('../../models/preferences')


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql

const {
  UserType,
  FavoriteType,
  AbonnementType,
  GoldenMatchType,
  PhotoType,
  PreferencesType
} = schema


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
    //favorite

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

    //photo
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

    //abonnement
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

    //preferences

    addPreferences: {
      type: PreferencesType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        gender: {
          type: GraphQLString
        },
        location: {
          type: GraphQLString
        },

      },
      async resolve(parent, args) {
        const existPreference = await Preferences.findOne({
          email: args.email
        })

        let newPreference
        try {
          if (!existPreference) {
            newPreference = new Preferences({
              email: args.email,
              gender: args.gender,
              location: args.location,

            });

          }
          if (newPreference) {
            return newPreference.save()
          }
        } catch (error) {
          throw new Error('preference exist')
          console.log('sishmian');
        }
      }
    },


    updatePreferences: {
      type: PreferencesType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        },
        gender: {
          type: GraphQLString
        },
        location: {
          type: GraphQLString
        },

      },
      async resolve(parent, args) {

        const updatedPrefernce = await Preferences.findOneAndUpdate({
          email: args.email
        }, {
          $set: {
            ...args
          }
        }, {
          new: true
        });

        console.log(updatedPrefernce);
        return updatedPrefernce
      }
    },

  })
})
module.exports = Mutation
