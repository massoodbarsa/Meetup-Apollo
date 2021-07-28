import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContextProvider'
import './Favorites.scss'
import { Avatar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function Favorites() {

    const context = useContext(UserContext);

    const classes = useStyles();

    let favItem = {}

    const favorites = context.favorites.map((fav, i) => {
        const favorite = context.usersData.map(item => {
            if (fav.favoriteEmail === item.email) {
                console.log(item);

                favItem = {
                    photo: item.profilePhoto,
                    name: item.name,
                    surename: item.surename
                }
                return favItem
            }
        })
        return (
            <section className='favorites__container'>

                <Link to={'/userProfile/' + fav.favoriteEmail} >
                    <div className='favorites__container__items'>
                        <Avatar
                            alt='favoritePhoto'
                            src={`http://localhost:4000${favItem.photo} `}
                            className={classes.large}
                        >
                        </Avatar>
                        <h3>{favItem.name} {favItem.surename}</h3>
                    </div>
                </Link>

            </section>
        )
    })
    return (
        <div className='favorites'>
            {favorites}
        </div>
    )
}
