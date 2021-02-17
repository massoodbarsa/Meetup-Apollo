import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation.scss'
import Logo from '../../assets/meteor-icon.svg'
import { UserContext } from '../../context/UserContextProvider'
import { Button } from '@material-ui/core';




const navigation = (props) => (

    <UserContext.Consumer>

        {(context) => {

            return (
                <header className='navigation'>
                    <div className='navigation__logo'>
                        <img src={Logo} alt="React Logo" />

                    </div>
                    <div className='navigation__items'>
                        <ul>
                            {!context.email && <li><NavLink to='/users'><Button variant="outlined" color="primary">Log in</Button></NavLink></li>}
                            {/* <li><NavLink to='/events'><Button variant="outlined" color="primary">Events</Button></NavLink></li> */}
                            <li><NavLink to='/dashboard'><Button variant="outlined" color="primary">Dashboard</Button></NavLink></li>
                             <li><NavLink to='/profile'><Button variant="outlined" color="primary">Profile</Button></NavLink></li>

                            {/* {context.token && <li><NavLink to='/bookings'><Button variant="outlined" color="primary">Bookings</Button></NavLink></li>} */}
                            {/* {context.token && <li><button onClick={context.logout}  >Sign Out</button></li>} */}
                            {context.email && <li>
                                <Button variant="outlined" color="primary" onClick={context.logout}>Sign Out</Button></li>}

                        </ul>
                    </div>
                </header>
            )
        }}


    </UserContext.Consumer>
)

export default navigation
