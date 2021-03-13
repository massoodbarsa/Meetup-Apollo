import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Survey.scss'
import Gender from './Gender'
import Age from './Age'
import Slider from '../../dashboard/Slider'
import Height from './Height'
import Country from './Country'

import { Button } from '@material-ui/core/';


export default function Survey() {

    const [age, setAge] = useState(null)
    const [location, setLocation] = useState(null)
    const [height, setHeight] = useState(null)
    const [gender, setGender] = useState(null)
    const [close, setClose] = useState(true)

    useEffect(() => {
        if (gender && age && location && height) {
            setClose(false)
        }
    }, [gender, height, location, age])


    const handleGender = (value) => {
        setGender(value)
    }

    const handleAgeOrGender = (value, name) => {

        switch (name) {
            case 'age':
                setAge(value)
                break;
            case 'height':
                setHeight(value)
                break;
            default:
                break;
        }

    }

    const handleLocation = (value) => {
        setLocation(value)
    }


    const handleClick = () => {
        console.log(gender, age, height, location);
    }




    const survays = [
        <Gender handleGender={handleGender} />,
        <Age handleAgeOrGender={handleAgeOrGender} name='age' />,
        <Height handleAgeOrGender={handleAgeOrGender} name='height' />,
        <Country handleLocation={handleLocation} />
    ]
    // const survays = [ <Country />]


    const survay = survays.map((item, index) => {
        return (
            <Carousel.Item className='carousel-container'>
                {item}
            </Carousel.Item>

        )
    })
    return (
        <div className='survay'>
            <Slider data={survays} comp='survey' title='' />
            <div className=' button-white survay__button'>
                <Button variant="outlined" color="primary" onClick={handleClick} disabled={close}>
                    Send
                </Button>
            </div>
        </div>
    )

}
