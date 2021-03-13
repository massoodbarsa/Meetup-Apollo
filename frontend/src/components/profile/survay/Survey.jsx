import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContextProvider'
import { useMutation } from '@apollo/client'

import './Survey.scss'
import Gender from './Gender'
import Age from './Age'
import Slider from '../../dashboard/Slider'
import Height from './Height'
import Country from './Country'
import { ADD_PREFERENCES, UPDATE_PREFERENCES } from '../../../pages/graphqlQuery/Mutation'
import { Button } from '@material-ui/core/';
import Carousel from 'react-bootstrap/Carousel'



export default function Survey() {


    const context = useContext(UserContext)
    console.log(context.preferences.gender);

    const [age, setAge] = useState(null)
    const [location, setLocation] = useState(context.preferences.location)
    const [height, setHeight] = useState(null)
    const [gender, setGender] = useState(context.preferences.gender)
    const [close, setClose] = useState(true)
    const [preferenceExist, setPreferenceExist] = useState(true)


    const [addPreferences, { data: preferenceData }] = useMutation(ADD_PREFERENCES);
    const [updatePreferences, { data: updatedPreferenceData }] = useMutation(UPDATE_PREFERENCES);

    useEffect(() => {
        if (preferenceData) {
            console.log(preferenceData.addPreferences);
            const { preferences } = preferenceData.addPreferences
            updatePreferences(preferences)
        }
    }, [preferenceData])


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
        if (age || location || height || gender) {
            updatePreferences({
                variables: {
                    // user: context.userId,
                    email: context.email,
                    // age: age,
                    gender: gender,
                    location: location,
                    // height: height
                }
            })
        }

        addPreferences({
            variables: {
                // user: context.userId,
                email: context.email,
                // age: age,
                gender: gender,
                location: location,
                // height: height
            }
        })
    }

    const survays = [
        <Gender handleGender={handleGender} gender={gender}/>,
        <Age handleAgeOrGender={handleAgeOrGender} name='age' />,
        <Height handleAgeOrGender={handleAgeOrGender} name='height' />,
        <Country handleLocation={handleLocation} location={location}/>
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
