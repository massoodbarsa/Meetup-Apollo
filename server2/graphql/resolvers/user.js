
const User = require('../../models/user')
const Images = require('../../models/image')



module.exports =
{
    Query: {
        users: () => { },
        refreshToken: () => { },

    },

    Mutation: {

        addPhoto: (root, args, { req }, info) => {
            let photo = new Images({
                user: "6031786f184bf918924b0521",
                url: args.url,
            });
            let createdPhoto
            return photo.save()
                .then(result => {
                    createdPhoto = { ...result._doc, _id: result._doc._id.toString() }
                    return User.findById('6031786f184bf918924b0521')
                })
                .then(user => {
                    if (!user) {
                        throw new Error('user exist') 
                    }
                    user.photos.push(photo)
                    return user.save()
                })
                .then(result=>{
                    return createdPhoto
                })
                .catch(err => {
                    console.log(err);
                    throw err
                })
        },
        //done
        login: async (root, args, { req }, info) => {
            // console.log('10 data',args);
            const user = await User.findOne({
                email: args.email,
                password: args.password
            })

            if (!user) {
                throw new Error('user does not exist')
            }

            return {
                ...user._doc, _id: user._doc._id.toString()
            };
        },
        //done
        register: async (root, args, { req }, info) => {
            const existingUser = await User.findOne({
                email: args.email
            });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const user = new User({
                email: args.email,
                password: args.password,
                name: args.name,
                surename: args.surename,
                age: args.age,
                profilePhoto: args.profilePhoto
            });

            return user.save()
        }
    }
}

