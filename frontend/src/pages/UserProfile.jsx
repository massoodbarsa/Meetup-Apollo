import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import './UserProfile.scss'
import Carousel from 'react-bootstrap/Carousel';

export default function UserProfile() {

    const context = useContext(UserContext)

    const { email } = useParams()

    const user = context.usersData.filter((item, index) => {

        return item.email === email

    })

    const { age, aboutMe, gender, height, place, photos, profilePhoto, surename, name } = user[0]


    return (
        <div className='userProfile-container'>
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
                <section className='userProfile-container__info__section'>
                    <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                    <p>{age}</p>
                </section>
                <section className='userProfile-container__info__section'>
                    <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                    <p>{age}</p>
                </section>
                <section className='userProfile-container__info__section'>
                    <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                    <p>{age}</p>
                </section>
                <section className='userProfile-container__info__section'>
                    <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                    <p>{age}</p>
                </section>
                <section className='userProfile-container__info__section'>
                    <FontAwesomeIcon icon={faBirthdayCake} size='3x' />
                    <p>{age}</p>
                </section>
            </div>

        </div>
    )
}
