
const User = require('../../models/user')
const Images = require('../../models/image')



module.exports = {
    Query: {

        photos: async () => {
            try {

                const photos = await Images.find()
                return photos

            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        },

    },

    Mutation: {

        addPhoto: async (root, { userId, url }, { req }, info) => {

            // const existImage = await Images.findOne({ url })

            // if (existImage) {
            //     throw new Error('photo already exist')
            // }

            const newImage = new Images({
                userId,
                url
            })

            console.log(userId);
            return newImage.save()
        },

        deletePhoto: async (root, { userId, url }, { req }, info) => {

            return Images.deleteOne({
                userId,
                url
            })
        },

        addProfilePhoto: async (root, { userId, url }, { req }, info) => {
            return User.findOneAndUpdate({
                "_id": userId
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

