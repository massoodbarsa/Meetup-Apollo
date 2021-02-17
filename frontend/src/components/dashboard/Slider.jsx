import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider'
import Carousel from 'react-bootstrap/Carousel';
import './Slider.scss';
import Cards from '../dashboard/Cards'



export default function Slider({ photo, comp }) {

    const context = useContext(UserContext);

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
                                photo.map((items => items.map((item, index) => {
                                    const { userId, url } = item
                                    return (

                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            <img
                                                className="d-block w-100 section-center__img"
                                                src={url}
                                                alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                {/* <h3>First slide label</h3> */}
                                                <p>{userId}</p>
                                            </Carousel.Caption>

                                            <Carousel.Caption>
                                                <h3>Third slide label</h3>
                                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )

                                })
                                ))
                            }


                        </Carousel>
                    }

                    {
                        comp === 'myprofile' && <Carousel slide={true}>
                            {
                                photo.map((item, index) => {
                                    const { url } = item
                                    return (

                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            <img
                                                className="d-block w-100 section-center__img"
                                                src={url}
                                                alt="First slide"
                                            />

                                            <Cards
                                                url={url}
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


