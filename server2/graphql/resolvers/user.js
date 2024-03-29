
const User = require('../../models/user')
const Images = require('../../models/image')
const { findById } = require('../../models/user')



module.exports = {

    Query: {

        users: async () => {
            try {

                const users = await User.find()
                // console.log(users);
                return users

            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
        },

        refreshToken: () => {

            console.log('selam');
        },

    },


    // User:{
    //     photos:async(root,{userId})=> await Images.findById(userId)
    // },

    Mutation: {

        login: async (root, args, { req }, info) => {
            // console.log('10 data',args);
            const user = await User.findOne({
                email: args.email,
                password: args.password
            })

            if (!user) {
                throw new Error('user does not exist')
            }

            return user
        },

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

