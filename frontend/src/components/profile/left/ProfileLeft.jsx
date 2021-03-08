import React, { useState, useContext, useEffect } from 'react'
import { Chip, FormLabel, TextareaAutosize, Button } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../../../context/UserContextProvider'
import { UPDATE_USER } from '../../../pages/graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function ProfileLeft() {

    const context = useContext(UserContext);

    const [age, setAge] = useState(context.age)
    const [firstName, setFirstName] = useState(context.name)
    const [lastName, setLastName] = useState(context.surename)
    const [editMode, setEditMode] = useState(false)

    const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);

    useEffect(() => {

        if (updateUserData) {
            console.log(updateUserData.updateUser);
            const { name, surename, age } = updateUserData.updateUser
            context.updateUser({ name, surename, age })
        }
    }, [updateUserData])



    const updateInputs = () => {
        console.log(typeof (age));

        setEditMode(false)

        updateUser({
            variables: {
                email: context.email,
                name: firstName,
                surename: lastName,
                age: parseInt(age)
            }
        })
    }
    return (
        <div className='profile__left'>

            {context.profilePhoto
                ?
                <div>
                    <Chip
                        label="Your Location"
                        className='profile__left__location'
                        size='medium'
                        // variant='outlined'
                        color="secondary"
                    // style={{ backgroundColor: '#424242', color: '#fff' }}

                    />
                    <img src={context.profilePhoto} className='profile__left__img' />

                </div>
                : <CircularProgress color="secondary"></CircularProgress>
            }

            <section className='profile__left__info'>
                <section className='profile__left__info__btns' >
                    <span className='button-red profile__left__info__btn'>
                        <Button variant="outlined" onClick={() => setEditMode(true)}>
                            <FontAwesomeIcon icon={faEdit} size='1x' />
                        </Button>
                    </span>  <span className='button-white button-red profile__left__info__btn'>
                        <Button variant="outlined" onClick={() => updateInputs()}>
                            <FontAwesomeIcon icon={faSave} size='1x' />
                        </Button>
                    </span>
                </section>

                <section className={editMode?'editmode':'profile__left__info__inputs-container'}>
                    <FormLabel className='profile__left__info__label' >Firstname</FormLabel>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        disabled={!editMode}
                    />
                    <FormLabel className='profile__left__info__label'>Surename</FormLabel>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        disabled={!editMode}

                    />

                    <FormLabel className='profile__left__info__label'>Age</FormLabel>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => { setAge(e.target.value) }}
                        disabled={!editMode}
                    />

                    <FormLabel className='profile__left__info__label'>About me</FormLabel>
                    <TextareaAutosize aria-label="minimum height" rowsMin={5} className='profile__left__info__textarea' />
                </section>
                {/* <Avatar alt="Cindy Baker" src="https://astrograph.com/free-horoscope/images/3GeminiHoroscope.png" /> */}
            </section>
        </div>
    )
}
