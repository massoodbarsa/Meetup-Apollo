import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider'
import Carousel from 'react-bootstrap/Carousel';
import './Slider.scss';
import Cards from '../dashboard/Cards'



export default function Slider({ usersData, comp }) {


    return (
        <div>
            <section className="section">
                <div className="title">
                    <h2>
                        <span>/</span>Happy Sliding ...
                     </h2>
                </div>
                <div className="section-center">
                    {
                        comp === 'dashboard' && <Carousel slide={true}>
                            {
                                usersData.map((item, index) => {
                                    const { email, profilePhoto, name } = item

                                    return (
                                        profilePhoto.length &&
                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            <Carousel.Caption>
                                                <h1>{name}</h1>
                                            </Carousel.Caption>
                                            <img
                                                className="d-block w-100 section-center__img"
                                                src={profilePhoto}
                                                alt="First slide"
                                            />
                                            <h5>{email}</h5>
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                    }

                    {
                        comp === 'myprofile' && <Carousel slide={true}>
                            {
                                usersData.map((item, index) => {
                                    const { email, profilePhoto } = item
                                    return (

                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            <img
                                                className="d-block w-100 section-center__img"
                                                src={profilePhoto}
                                                alt="First slide"
                                            />

                                            <Cards
                                                url={profilePhoto}
                                                key={index}
                                                favTitle='Make it your profile picture'
                                                delTitle='Delete!'
                                            // handleProfilePic={handleProfilePic}
                                            // handleDelPic={handleDelPic}

                                            />
                                        </Carousel.Item>
                                    )
                                })
                            }
                        </Carousel>
                    }
                </div>
            </section>

        </div>
    )
}


