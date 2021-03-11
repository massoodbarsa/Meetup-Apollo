import React, { useState, useContext, useEffect } from 'react'
import { Chip, FormLabel, TextareaAutosize, Button } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../../../context/UserContextProvider'
import { UPDATE_USER } from '../../../pages/graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'
import { faEdit, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons'
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

    const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);

    useEffect(() => {

        if (updateUserData) {
            console.log(updateUserData.updateUser);
            const { name, surename, age, aboutMe } = updateUserData.updateUser
            context.updateUser({ name, surename, age, aboutMe })
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
                aboutMe: aboutMe
            }
        })
    }

    const avatar = context.gender === 'female' ? FemaleAvatar : MaleAvatar
    return (
        <div className='profile__left'>
            <div>
                <Chip
                    label="Your Location"
                    className='profile__left__location'
                    size='medium'
                    // variant='outlined'
                    color="secondary"
                // style={{ backgroundColor: '#424242', color: '#fff' }}

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
                        type="text"
                        value={age}
                        onChange={(e) => { setAge(e.target.value) }}
                        disabled={!editMode}
                    />

                    <FormLabel className='profile__left__info__label'>About me</FormLabel>
                    <TextareaAutosize
                        aria-label="minimum height"
                        rowsMin={5}
                        className='profile__left__info__textarea'
                        onChange={(e) => { setAboutMe(e.target.value) }}
                        value={aboutMe}
                        disabled={!editMode}


                    />
                </section>
                {/* <Avatar alt="Cindy Baker" src="https://astrograph.com/free-horoscope/images/3GeminiHoroscope.png" /> */}
            </section>
        </div>
    )
}
