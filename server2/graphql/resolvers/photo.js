

const User = require('../../models/user')
const Images = require('../../models/image')



module.exports =
{
    Query: {

        refreshToken: () => {

            console.log('selam');
        },

    },

    Mutation: {

        addImage:(root, args, { req }, info) => {


            console.log(args);






            // let photo = new Images({
            //     user: "6031786f184bf918924b0521",
            //     url: args.url,
            // });
            // let createdPhoto
            // return photo.save()
            //     .then(result => {
            //         createdPhoto = { ...result._doc, _id: result._doc._id.toString() }
            //         return User.findById('6031786f184bf918924b0521')
            //     })
            //     .then(user => {
            //         if (!user) {
            //             throw new Error('user exist') 
            //         }
            //         user.photos.push(photo)
            //         return user.save()
            //     })
            //     .then(result=>{
            //         return createdPhoto
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         throw err
            //     })


        },

    }
}

