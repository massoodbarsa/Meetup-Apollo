import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../context/UserContextProvider'
import { UPDATE_USER } from '../../../pages/graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'

import { faEdit, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Chip, FormLabel, TextareaAutosize, Button, Select, MenuItem, FormControl } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FemaleAvatar from '../../../assets/femAvatar.jpeg'
import MaleAvatar from '../../../assets/maleAvatar.jpeg'


export default function ProfileLeft() {

    const context = useContext(UserContext);

    const [age, setAge] = useState(context.age)
    const [firstName, setFirstName] = useState(context.name)
    const [lastName, setLastName] = useState(context.surename)
    const [aboutMe, setAboutMe] = useState(context.aboutMe)
    const [editMode, setEditMode] = useState(false)
    const [place, setPlace] = useState(context.place)
    const [height, setHeight] = useState(context.height)

    const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);

    useEffect(() => {

        if (updateUserData) {
            console.log(updateUserData.updateUser);
            const { name, surename, age, aboutMe, place } = updateUserData.updateUser
            context.updateUser({ name, surename, age, aboutMe, place })
        }
    }, [updateUserData])

    const updateInputs = () => {
        //prevent save if there is no change on inputs
        setEditMode(false)

        if (context.name) {

        }
        updateUser({
            variables: {
                email: context.email,
                name: firstName,
                surename: lastName,
                age: parseInt(age),
                aboutMe: aboutMe,
                place: place,
                height: parseInt(height),
            }
        })
    }

    //countries
    const [allCountries, setAllCountries] = useState([])

    useEffect(() => {
        fetchCountriesData()
    }, [])

    const fetchCountriesData = async () => {
        const url = 'https://restcountries.eu/rest/v2/all'
        const response = await (await fetch(url)).json()
        setAllCountries(response)
    }

    const countries = allCountries.map(item => {
        return (
            <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
        )
    })
    //height
    let numbersArray = new Array(220)

    let numbers = []

    for (var i = 100; i < numbersArray.length; i++) {
        numbers.push(i)
    }

    const heights = numbers.map((item, index) => {

        return (
            <MenuItem value={item} key={index}>{item}</MenuItem>
        )
    })

    const avatar = context.gender === 'female' ? FemaleAvatar : MaleAvatar

    return (
        <div className='profile__left'>
            <div>
                <Chip
                    label="Your Location"
                    className='profile__left__location'
                    size='medium'
                    color="secondary"
                />
                <img src={context.profilePhoto ? context.profilePhoto : avatar} className='profile__left__img' />

            </div>
            <section className='profile__left__info'>
                <section className='profile__left__info__btns' >
                    <span className='button-red profile__left__info__btn'>
                        <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
                            <FontAwesomeIcon icon={!editMode ? faEdit : faWindowClose} size='1x' />
                        </Button>
                    </span>
                    <span className='button-white button-red profile__left__info__btn'>
                        <Button variant="outlined" onClick={() => updateInputs()} disabled={!editMode}
                        >
                            <FontAwesomeIcon icon={faSave} size='1x' />
                        </Button>
                    </span>
                </section>

                <section className={editMode ? 'editmode' : 'profile__left__info__inputs-container'}>
                    <FormLabel className='profile__left__info__label' >Firstname</FormLabel>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!editMode}
                    />
                    <FormLabel className='profile__left__info__label'>Surename</FormLabel>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!editMode}

                    />
                    <FormLabel className='profile__left__info__label'>Age</FormLabel>
                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        disabled={!editMode}
                    />
                    <FormLabel className='profile__left__info__label'>Place</FormLabel>
                    <section className='profile__left__select-place'>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                variant='filled'
                                autoWidth
                                disabled={!editMode}
                            >
                                {countries}

                            </Select>
                        </FormControl>
                    </section>
                    <FormLabel className='profile__left__info__label'>Height</FormLabel>
                    <section className='profile__left__select-place'>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                variant='filled'
                                autoWidth
                                disabled={!editMode}
                            >
                                {heights}

                            </Select>
                        </FormControl>
                    </section>
                    <FormLabel className='profile__left__info__label'>About me</FormLabel>
                    <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={3}
                        className='profile__left__info__textarea'
                        onChange={(e) => setAboutMe(e.target.value)}
                        value={aboutMe}
                        disabled={!editMode}
                    />
                </section>
                {/* <Avatar alt="Cindy Baker" src="https://astrograph.com/free-horoscope/images/3GeminiHoroscope.png" /> */}
            </section>
        </div>
    )
}
