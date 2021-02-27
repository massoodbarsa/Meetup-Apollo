import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation addUser($email : String! , $password:String!, $name:String!){
    addUser(email:$email,password:$password,name:$name){
        email
        name
        password
        surename
        age
        profilePhoto 
      }
}
`

export const LOGIN = gql`
mutation login($email : String! , $password:String!){
    login(email:$email, password:$password){
      
        name
        email 
        surename
        age
        profilePhoto
        photos{
            url
          }
        abonnement{
            name
            price
            discount
            tickets
            startDate
            days
          }
    }
}
`
export const ADD_PHOTO = gql`
# mutation addPhoto($user : ID! , $url:String!){


#     addPhoto(user:$user,url:$url){
#       user,
#       url
#       }

mutation addPhoto($email : String! , $url:String!){
addPhoto(email:$email,url:$url){
  email,
  url
  }
}
`

export const DEL_PHOTO = gql`
mutation deletePhoto($email : String! , $url:String!){
  deletePhoto(email:$email,url:$url){
      email,
      url
      }
}

`
export const SET_PROFILE_PHOTO = gql`
mutation addProfilePhoto($email : String! , $profilePhoto:String!){
  addProfilePhoto(email:$email,profilePhoto:$profilePhoto){
      email,
      profilePhoto
      }
}

`
