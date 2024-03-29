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
        place
        height
        favorites{
          favoriteEmail
        }
        photos{
            url
          }
        abonnement{
            price
            type
            startDate
            days
          }
          preferences{
            gender
            location
            ageRange{
              minAge
              maxAge
            }
            heightRange{
              minHeight
              maxHeight
            }
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
mutation updateUser($email:String!, $name:String, $surename:String, $age:Int, $ticket:Int,$aboutMe:String,$place:String,$height:Int){
    updateUser(email:$email,name:$name,surename:$surename,age:$age,aboutMe:$aboutMe,place:$place,height:$height,ticket:$ticket){
        email
        name
        surename
        age
        aboutMe
        profilePhoto
        ticket,
        place,
        height
      }
}
`


//photo
export const ADD_PHOTO = gql`
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

//favorites

export const ADD_FAVORITES = gql`
mutation addFavorites($email : String!, $favoriteEmail : String!){
  addFavorites(email:$email, favoriteEmail:$favoriteEmail){
      email,
      favoriteEmail
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

//preferences
export const ADD_PREFERENCES = gql`
# mutation addPreferences($email : String! , $gender:String, $location:String , $height:Int,$age:Int){
#   addPreferences(email:$email, gender:$gender, location:$location, height:$height,age:$age){
  mutation addPreferences($email : String! , $gender:String, $location:String ){
  addPreferences(email:$email, gender:$gender, location:$location){
        email
        gender
        location
        ageRange{
          minAge
          maxAge
        }
        heightRange{
          minHeight
          maxHeight
        }
      }
}
`
export const UPDATE_PREFERENCES = gql`
# mutation updatePreferences($email : String! , $gender:String, $location:String , $height:Int,$age:Int){
#   updatePreferences(email:$email, gender:$gender, location:$location, height:$height,age:$age){

    mutation updatePreferences($email : String! , $gender:String, $location:String ){
  updatePreferences(email:$email, gender:$gender, location:$location){
        email
        gender
        location
        ageRange{
          minAge
          maxAge
        }
        heightRange{
          minHeight
          maxHeight
        }
       
      }
}
`

export const ADD_AGE_RANGE = gql`
mutation addAgeRange($email : String!, $minAge:Int, $maxAge:Int){
  addAgeRange(email:$email,  minAge:$minAge, maxAge:$maxAge){

        email
        minAge
        maxAge

      }
}
`

export const ADD_HEIGHT_RANGE = gql`
mutation addHeightRange($email : String!, $minHeight:Int, $maxHeight:Int){
  addHeightRange(email:$email, minHeight:$minHeight, maxHeight:$maxHeight){

        email
        minHeight
        maxHeight
    
      }
}
`

export const UPDATE_AGE_RANGE = gql`
mutation updateAgeRange($email : String!, $minAge:Int, $maxAge:Int){
  updateAgeRange(email:$email,  minAge:$minAge, maxAge:$maxAge){

        email
        minAge
        maxAge

      }
}
`


export const UPDATE_HEIGHT_RANGE = gql`
mutation updateHeightRange($email : String!, $minHeight:Int, $maxHeight:Int){
  updateHeightRange(email:$email, minHeight:$minHeight, maxHeight:$maxHeight){

        email
        minHeight
        maxHeight

      }
}
`
