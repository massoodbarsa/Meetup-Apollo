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
        gender
        aboutMe
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
mutation addUser($email:String!, $password:String!, $name:String!, $surename:String, $gender:String){
    addUser(email:$email,password:$password,name:$name,surename:$surename,gender:$gender){
        email
        name
        password
        surename
        age
        profilePhoto 
        gender
      }
}
`
export const UPDATE_USER = gql`
mutation updateUser($email:String!, $name:String, $surename:String, $age:Int, $ticket:Int,$aboutMe:String){
    updateUser(email:$email,name:$name,surename:$surename,age:$age,aboutMe:$aboutMe,ticket:$ticket){
        email
        name
        surename
        age
        aboutMe
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
