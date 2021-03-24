import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContextProvider'
import { useMutation } from '@apollo/client'

import './Survey.scss'
import Gender from './Gender'
import Age from './Age'
import Slider from '../../dashboard/Slider'
import Height from './Height'
import Country from './Country'
import { Button, Snackbar } from '@material-ui/core/';
import Carousel from 'react-bootstrap/Carousel'

import {
    ADD_PREFERENCES,
    UPDATE_PREFERENCES,
    ADD_AGE_RANGE,
    ADD_HEIGHT_RANGE,
    UPDATE_HEIGHT_RANGE,
    UPDATE_AGE_RANGE
} from '../../../pages/graphqlQuery/Mutation'



export default function Survey(props) {


    const context = useContext(UserContext)

    const loc = context.preferences ? context.preferences.location : null
    const gen = context.preferences ? context.preferences.gender : null

    const [minAge, setMinAge] = useState(null)
    const [minHeight, setMinHeight] = useState(null)
    const [maxAge, setMaxAge] = useState(null)
    const [maxHeight, setMaxHeight] = useState(null)
    const [location, setLocation] = useState(loc)

    const [gender, setGender] = useState(gen)
    // const [close, setClose] = useState(true)
    const [snackbarSuccess, setSnackbarSuccess] = useState(false)
    const [message, setMessage] = useState('')


    const [addPreferences, { data: preferenceData }] = useMutation(ADD_PREFERENCES);
    const [updatePreferences, { data: updatedPreferenceData }] = useMutation(UPDATE_PREFERENCES);

    const [addAgeRange, { data: addAgeRangeData }] = useMutation(ADD_AGE_RANGE);
    const [updateAgeRange, { data: updateAgeRangeData }] = useMutation(UPDATE_AGE_RANGE);

    const [addHeightRange, { data: addHeightRangeData }] = useMutation(ADD_HEIGHT_RANGE);
    const [updateHeightRange, { data: updateHeightRangeData }] = useMutation(UPDATE_HEIGHT_RANGE);


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


    // useEffect(() => {
    //     if (gender && minAge && maxAge && minHeight && maxHeight) {
    //         setClose(false)
    //     }
    // }, [gender, location, maxAge, minAge, minHeight, maxHeight])


    const handleGender = (value) => {
        setGender(value)
    }

    const handleAgeOrGender = (value, name) => {

        switch (name) {
            case 'age':
                setMinAge(value[0])
                setMaxAge(value[1])
                break;
            case 'height':
                setMinHeight(value[0])
                setMaxHeight(value[1])
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



            if (context.preferences.ageRange.length > 0) {

                updateAgeRange({
                    variables: {
                        email: context.email,
                        minAge: minAge,
                        maxAge: maxAge,
                    }
                })
            }
            else {

                addAgeRange({
                    variables: {
                        email: context.email,
                        minAge: minAge,
                        maxAge: maxAge,
                    }
                })
            }
            if (context.preferences.heightRange.length > 0) {

                updateHeightRange({
                    variables: {
                        email: context.email,
                        minHeight: minHeight,
                        maxHeight: maxHeight,
                    }
                })
            } else {

                addHeightRange({
                    variables: {
                        email: context.email,
                        minHeight: minHeight,
                        maxHeight: maxHeight,
                    }
                })
            }

            updatePreferences({
                variables: {
                    email: context.email,
                    gender: gender,
                    location: location,
                }
            })

        } else {
            console.log('add');

            addPreferences({
                variables: {
                    email: context.email,
                    gender: gender,
                    location: location,
                }
            })

            addAgeRange({
                variables: {
                    email: context.email,
                    minAge: minAge,
                    maxAge: maxAge,
                }
            })

            addHeightRange({
                variables: {
                    email: context.email,
                    minHeight: minHeight,
                    maxHeight: maxHeight,
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
        <Age handleAgeOrGender={handleAgeOrGender} name='age' ageRange={context.preferences ? context.preferences.ageRange : []} />,
        <Height handleAgeOrGender={handleAgeOrGender} name='height' heightRange={context.preferences ? context.preferences.heightRange : []} />,
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
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClick}
                    // disabled={close}
                >
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
