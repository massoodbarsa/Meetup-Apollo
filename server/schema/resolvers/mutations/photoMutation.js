const graphql = require('graphql')
const schema = require('../../schema')
const Images = require('../../../models/image')
const User = require('../../../models/user')

const {
    GraphQLString,
    GraphQLNonNull
} = graphql

const {
    UserType,
    PhotoType,
} = schema

const photoMutation = {
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
}

module.exports = photoMutation
