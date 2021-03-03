import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($email : String! , $password:String!){
    login(email:$email, password:$password){
      
        name
        email 
        surename
        age
        profilePhoto
        ticket
        photos{
            url
          }
        abonnement{
            price
            type
            startDate
            days
          }
    }
}
`

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
export const UPDATE_USER = gql`
mutation updateUser($email : String! , $name:String, $ticket:Int){
    updateUser(email:$email,name:$name,ticket:$ticket){
        email
        name
        surename
        age
        profilePhoto 
        ticket
      }
}
`


//photo 
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

//abonnement
export const ADD_ABONNEMENT = gql`
mutation addAbonnement($email : String! , $type:String, $price:Int , $days:Int){
    addAbonnement(email:$email, type:$type, price:$price, days:$days){
        email
        type
        price
        days
      }
}
`
