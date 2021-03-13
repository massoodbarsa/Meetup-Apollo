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
import { Button, Snackbar } from '@material-ui/core/';
import Carousel from 'react-bootstrap/Carousel'




export default function Survey(props) {


    const context = useContext(UserContext)

    const loc = context.preferences ? context.preferences.location : null
    const gen = context.preferences ? context.preferences.gender : null

    const [age, setAge] = useState(null)
    const [location, setLocation] = useState(loc)
    const [height, setHeight] = useState(null)
    const [gender, setGender] = useState(gen)
    const [close, setClose] = useState(true)
    const [snackbarSuccess, setSnackbarSuccess] = useState(false)
    const [message, setMessage] = useState('')


    const [addPreferences, { data: preferenceData }] = useMutation(ADD_PREFERENCES);
    const [updatePreferences, { data: updatedPreferenceData }] = useMutation(UPDATE_PREFERENCES);

    useEffect(() => {
        if (preferenceData) {
            context.updatePreferences(preferenceData.addPreferences)
            setMessage('Your preferences is added')
            setSnackbarSuccess(true)

            setTimeout(() => {
                props.history.push({
                    pathname: "/profile",

                });
            }, 3500)
        }
    }, [preferenceData])


    useEffect(() => {
        if (updatedPreferenceData) {
            context.updatePreferences(updatedPreferenceData.updatePreferences)
            setMessage('Your preferences is updated')
            setSnackbarSuccess(true)

            setTimeout(() => {
                props.history.push({
                    pathname: "/profile",

                });
            }, 3500)
        }
    }, [updatedPreferenceData])




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
        if (context.preferences) {
            console.log('update');
            updatePreferences({
                variables: {
                    email: context.email,
                    // age: age,
                    gender: gender,
                    location: location,
                    // height: height
                }
            })
        } else {
            console.log('add');

            addPreferences({
                variables: {
                    email: context.email,
                    // age: age,
                    gender: gender,
                    location: location,
                    // height: height
                }
            })
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarSuccess(false)
    };

    const survays = [
        <Gender handleGender={handleGender} gender={gender} />,
        <Age handleAgeOrGender={handleAgeOrGender} name='age' />,
        <Height handleAgeOrGender={handleAgeOrGender} name='height' />,
        <Country handleLocation={handleLocation} location={location} />
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
            <section className='snackbarOnSuccess'>
                <Snackbar
                    message={message}
                    key={'top' + 'center'}
                    open={snackbarSuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                </Snackbar>
            </section>
        </div>
    )

}
