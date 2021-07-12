import { gql } from '@apollo/client'


export const GET_USERS = gql`
    query  {
        getUsers{
                email
                profilePhoto
                name
                surename
                gender
                aboutMe
                height
                place
                age
                photos {
                    email
                    url
                }
        }
     }
  `
