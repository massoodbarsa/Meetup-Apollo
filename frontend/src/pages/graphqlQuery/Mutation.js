import { gql } from '@apollo/client'



export const ADD_USER = gql`
mutation addUser($email : String! , $password:String!){
    addUser(email:$email,password:$password){
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