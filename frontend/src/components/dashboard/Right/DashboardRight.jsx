import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Divider, Avatar } from '@material-ui/core/';
import { UserContext } from '../../../context/UserContextProvider'
import Favorites from './Favorites';
import Viewers from './Viewers';
import Modal from '../../modal/modal'
import FadeBackground from '../../modal/fadeBackground'

function DashboardRight() {

    const context = useContext(UserContext);

    const [favorites, setFavorites] = useState(false)
    const [viewers, setViewers] = useState(false)

    return (
        < >
            <NavLink to='/profile'><Button variant="outlined" color="primary">
                <Avatar
                    variant='square'
                    alt='Profile'
                    src={`http://localhost:4000${context.profilePhoto} `}
                >
                </Avatar>
            </Button>
            </NavLink>
            <Divider className='divider' />

            <div className='dashboard__right__buttons  button-white'>

                {/* <div className='profile__right__buttons'> */}
                <div className=' button-white'>
                    <Button variant="outlined" color="primary" onClick={() => { setFavorites(true) }}>
                        Favorites
                    </Button>
                </div>

                {favorites && <FadeBackground />}

                {favorites && <Modal
                    title="Favorites"
                    isCancel
                    onCancel={() => setFavorites(false)}
                >
                    <Favorites />
                </Modal>}

                <div className=' button-white'>
                    <Button variant="outlined" color="primary" onClick={() => { setViewers(true) }}>
                        Viewers
                    </Button>
                </div>
                {viewers && <FadeBackground />}

                {viewers && <Modal
                    title="Viewers"
                    isCancel
                    onCancel={() => setViewers(false)}
                >
                    <Viewers />
                </Modal>}

            </div>
        </>
    )
}

export default DashboardRight

// export default React.memo(DashboardRight)
