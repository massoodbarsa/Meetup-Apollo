import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faTextHeight, faAddressCard, faVenusMars, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import './UserProfile.scss'
import Carousel from 'react-bootstrap/Carousel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Tooltip, Fab } from '@material-ui/core';

import { ADD_FAVORITES } from './graphqlQuery/Mutation'

import { useMutation } from '@apollo/client'


export default function UserProfile() {

    const context = useContext(UserContext)

    const { email } = useParams()

    const [addFavorites, { data: favoritesData }] = useMutation(ADD_FAVORITES);



    useEffect(() => {
        console.log(favoritesData);
        if (favoritesData) {

            const { favoriteEmail } = favoritesData.addFavorites

            context.addFavorites(favoriteEmail)
        }
    }, [favoritesData])

    const user = context.usersData.filter((item, index) => {
        return item.email === email
    })

    const { age, aboutMe, gender, height, place, photos, profilePhoto, surename, name } = user[0]

    const handleAddFavorite = () => {
        addFavorites({
            variables: {
                email: context.email,
                favoriteEmail: 'salam'
            }
        })
    }


    // function handleProfilePic(url) {

    //     addProfilePhoto({
    //         variables: {
    //             email: context.email,
    //             profilePhoto: url
    //         }
    //     })
    // }
    return (
        <div className='userProfile-container'>
            <div className='userProfile-container__favorite' >
                <Tooltip title="Add to favorites" aria-label="add">
                    <Fab color="secondary" onClick={handleAddFavorite}>
                        <FavoriteIcon />
                    </Fab>
                </Tooltip>
            </div>
            <div className='userProfile-container__images'>
                {
                    <Carousel slide={true}>
                        {
                            photos.map((item, index) => {
                                const { url } = item

                                return (
                                    profilePhoto &&
                                    <Carousel.Item key={index} className=''>
                                        <Carousel.Caption>
                                            <h1>{name}</h1>
                                        </Carousel.Caption>
                                        <img
                                            className="section-center__img"
                                            src={`http://localhost:4000${url} `}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                }
            </div>
            <div className='userProfile-container__info'>
                <div className='userProfile-container__info__sections'>
                    <section className='userProfile-container__info__sections__item'>
                        <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                        <p>{age}</p>
                    </section>
                    <section className='userProfile-container__info__sections__item'>
                        <FontAwesomeIcon icon={faTextHeight} size='3x' />
                        <p>{height}</p>
                    </section>
                    <section className='userProfile-container__info__sections__item'>
                        <FontAwesomeIcon icon={faVenusMars} size='3x' />
                        <p>{gender}</p>
                    </section>
                    <section className='userProfile-container__info__sections__item'>
                        <FontAwesomeIcon icon={faLocationArrow} size='3x' />
                        <p>{place}</p>
                    </section>
                </div>
                <section className='userProfile-container__info__aboutme'>
                    <FontAwesomeIcon icon={faAddressCard} size='3x' />
                    <p>{aboutMe}</p>
                </section>

            </div>
        </div>
    )
}
