import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider'
import Carousel from 'react-bootstrap/Carousel';
import './Slider.scss';


export default function Slider({ data, comp }) {

    return (
        <div>
            <section className="section">
                {comp === 'dashboard' && <div className="title">
                    <h2>
                        <span>/</span>Happy Sliding ...
                     </h2>
                </div>}
                <div className="section-center">
                    {
                        comp === 'dashboard' && <Carousel slide={true}>
                            {
                                data.map((item, index) => {
                                    const { email, profilePhoto, name } = item

                                    return (
                                        profilePhoto &&
                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            <Carousel.Caption>
                                                <h1>{name}</h1>
                                            </Carousel.Caption>
                                            <img
                                                className="section-center__img"
                                                src={`http://localhost:4000${profilePhoto} `}
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
                        comp === 'survey' &&
                        <Carousel slide={true} interval={null} fade={true} wrap={false}>
                            {
                                data.map((item, index) => {
                                    return (

                                        <Carousel.Item key={index} className='section-center__img-container'>
                                            {item}
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


