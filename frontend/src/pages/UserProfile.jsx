import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider'


export default function UserProfile() {

    const context = useContext(UserContext)

    console.log(context.usersData);


    const { email } = useParams()

    const user = context.usersData.filter((item, index) => {

        return item.email === email

    })

    console.log(user);
    console.log(email);
    return (
        <div>
            
        </div>
    )
}
