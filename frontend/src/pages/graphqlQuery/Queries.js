import { gql } from '@apollo/client'

// export const LOGIN = gql`
// query(){
//     login(email:"${email}", password:"${password}"){
//         name
//         email 
//         surename
//         age
//         profilePhoto
//         photos{
//             url
//           }
//         abonnement{
//             name
//             price
//             discount
//             tickets
//             startDate
//             days
//           }
//     }
// }
// `
export const GET_USERS = gql`
    query  {
        getUsers{
                email
                photos {
                email
                    url
                }
        }
        }
  `

