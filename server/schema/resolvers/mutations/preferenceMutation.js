
const graphql = require('graphql')
const schema = require('../../schema')
const Preferences = require('../../../models/preferences')
const AgeRange = require('../../../models/age')
const HeightRange = require('../../../models/height')


const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql

const {
  PreferencesType,
  AgeRangeType,
  HeightRangeType
} = schema

const preferenceMutation = {
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


  addAgeRange: {
    type: AgeRangeType,
    args: {
      email: {
        type: GraphQLString
      },
      minAge: {
        type: GraphQLInt
      },
      maxAge: {
        type: GraphQLInt
      },

    },
    async resolve(parent, args) {
      const existAgeRange = await AgeRange.findOne({
        email: args.email
      })

      let newAgeRange
      try {
        if (!existAgeRange) {
          newAgeRange = new AgeRange({
            email: args.email,
            minAge: args.minAge,
            maxAge: args.maxAge,
          });

        }
        if (newAgeRange) {
          return newAgeRange.save()
        }
      } catch (error) {
        throw new Error('preference exist')
        console.log('sishmian');
      }
    }
  },

  addHeightRange: {
    type: HeightRangeType,
    args: {
      email: {
        type: GraphQLString
      },
      minHeight: {
        type: GraphQLInt
      },
      maxHeight: {
        type: GraphQLInt
      },

    },
    async resolve(parent, args) {
      const existAgeRange = await HeightRange.findOne({
        email: args.email
      })

      let newHeightRange
      try {
        if (!existAgeRange) {
          newHeightRange = new HeightRange({
            email: args.email,
            minHeight: args.minHeight,
            maxHeight: args.maxHeight,
          });

        }
        if (newHeightRange) {
          return newHeightRange.save()
        }
      } catch (error) {
        throw new Error('hichi baba')
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

}

module.exports = preferenceMutation
