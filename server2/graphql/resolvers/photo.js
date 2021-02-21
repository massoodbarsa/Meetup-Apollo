
const User = require('../../models/user')
const Images = require('../../models/image')



module.exports = {
    Query: {

        refreshToken: () => {

            console.log('selam');
        },

    },

    Mutation: {

        addImage: async (root, { user, url }, { req }, info) => {

            const existImage = await Images.findOne({url})

            if (existImage) {
                throw new Error('photo already exist')
            }

            const newImage = new Images({
                user,
                url
            })
            return newImage.save()
        },

    }
}

