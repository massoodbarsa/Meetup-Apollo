
const User = require('../../models/user')
const Images = require('../../models/image')



module.exports = {
    Query: {

        refreshToken: () => {

            console.log('selam');
        },

    },

    Mutation: {

        addPhoto: async (root, { user, url }, { req }, info) => {

            // const existImage = await Images.findOne({ url })

            // if (existImage) {
            //     throw new Error('photo already exist')
            // }

            const newImage = new Images({
                user,
                url
            })
            return newImage.save()
        },

        deletePhoto: async (root, { user, url }, { req }, info) => {

            return Images.deleteOne({
                user,
                url

            })
        },

        addProfilePhoto: async (root, { user, url }, { req }, info) => {
            return User.findOneAndUpdate({
                "_id": user
            }, {
                "$set": {
                    profilePhoto: url
                }
            }, {
                "new": true
            } //returns new document
            ).exec((err, res) => {
                console.log('test', res)
                return 
                if (err) reject(err)
                
            })
        },

    }
}

