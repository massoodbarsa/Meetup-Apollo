import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Survey.scss'
import Gender from './Gender'
import Age from './Age'
import Slider from '../../dashboard/Slider'
import Height from './Height'
import Country from './Country'

export default function Survey() {

    const [surveyState, setSurveyState] = useState({
        //all parameters from childeren collect here then call updateUser 
    })

    const survays = [<Gender />, <Age />, <Height />, <Country />]
    // const survays = [ <Country />]


    const survay = survays.map((item, index) => {
        return (
            <Carousel.Item className='carousel-container'>
                {item}
            </Carousel.Item>
        )
    })
    return (

        <Slider data={survays} comp='survey' title='' />
    )

}
