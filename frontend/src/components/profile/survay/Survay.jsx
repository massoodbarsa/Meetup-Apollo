import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Survay.scss'
import Gender from './Gender'
export default function Survay() {

    const [survayState, setSurvayState] = useState({
        //all parameters from childeren collect here then call updateUser 
    })

    return (
        <div className='survay-container'>
            <Carousel>
                <Carousel.Item>
                    <Gender />


                </Carousel.Item>
            </Carousel>
        </div>
    )
}
