import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Survey.scss'
import Gender from './Gender'
export default function Survey() {

    const [surveyState, setSurveyState] = useState({
        //all parameters from childeren collect here then call updateUser 
    })

    return (
        <div className='survey-container'>
            <Carousel>
                <Carousel.Item>
                    <Gender />


                </Carousel.Item>
            </Carousel>
        </div>
    )
}
