import React, { useState } from 'react'
import { CardContent, CardActions, Card, Tooltip } from '@material-ui/core';
import './Cards.scss'
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Cards({ favTitle, delTitle, url, handleProfilePic, handleDelPic }) {

    // const [photo, setPhoto] = useState(url)

    const handleFavorite = () => {
        // setPhoto(url)
        handleProfilePic(url)
    }

    const handleDelete = () => {
        handleDelPic(url)
    }


    return (

        <Card variant="outlined" className='card-container' style={{ backgroundColor: '#121212' }}>
            <CardContent>
                <img src={url} className='card-container__image' />
            </CardContent>
            <section className="icon-container">
                <CardActions>
                    <Tooltip
                        title={favTitle||"Favorite"}
                        aria-label="add"
                        enterDelay={200}
                        leaveDelay={300}
                        placement='bottom-start'
                    >
                        <FavoriteIcon size="small" onClick={handleFavorite} className='card-container__icon__fav'> </FavoriteIcon>

                    </Tooltip>
                </CardActions>

                <CardActions>
                    <Tooltip
                        title={delTitle||'Delete'}
                        aria-label="add"
                        enterDelay={200}
                        leaveDelay={300}
                        placement='bottom-start'
                    >
                        <DeleteIcon size="small" onClick={handleDelete} className='card-container__icon__del'> </DeleteIcon>

                    </Tooltip>
                </CardActions>
            </section>
        </Card >
    )
}


