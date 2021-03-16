import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContextProvider'
import './Profile.scss'
import { Link } from 'react-router-dom'

import BuyPrem from '../components/profile/BuyPrem';
import BuyTicket from '../components/profile/BuyTicket';
import FadeBackground from '../components/modal/fadeBackground'
import Modal from '../components/modal/modal'
import Cards from '../components/dashboard/Cards'
import GoogleMapContainer from '../components/profile/GoogleMapContainer';
import ProfileLeft from '../components/profile/left/ProfileLeft';

import { ADD_PHOTO, DEL_PHOTO, SET_PROFILE_PHOTO } from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'

import { Grid, Chip, Button, Tooltip, FormLabel, Divider, Box, LinearProgress, Paper, Typography } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import FaceIcon from '@material-ui/icons/Face';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'

import { Map, GoogleApiWrapper } from 'google-maps-react';




function MyProfile() {

    const context = useContext(UserContext);

    const [addPhoto, { data: addPhotoData }] = useMutation(ADD_PHOTO);
    const [deletePhoto, { data: delPhotoData }] = useMutation(DEL_PHOTO);
    const [addProfilePhoto, { data: profilePhotoData }] = useMutation(SET_PROFILE_PHOTO);


    useEffect(() => {
        if (addPhotoData) {
            context.addNewPhoto(addPhotoData.addPhoto.url)
        }
    }, [addPhotoData])

    useEffect(() => {
        if (profilePhotoData) {
            const { profilePhoto } = profilePhotoData.addProfilePhoto
            context.setProfilePic(profilePhoto)
        }
    }, [profilePhotoData])

    useEffect(() => {
        let survayProcent = 0
        let preferencesLength = 0
        for (const key in context.preferences) {
            if (Object.hasOwnProperty.call(context.preferences, key)) {

                ++preferencesLength
            }
        }

        for (const key in context.preferences) {
            if (Object.hasOwnProperty.call(context.preferences, key)) {
                const element = context.preferences[key];

                if (element.length > 0 && element !== 'Preference') {
                    console.log(element);
                    let elementProcent = 100 / (preferencesLength - 1);
                    survayProcent += elementProcent
                }
            }
        }
        setProgress(survayProcent)
    }, [])

    const [anchorEl, setAnchorEl] = useState(null)
    const [progress, setProgress] = useState()
    const [buyPrem, setBuyPrem] = useState(false)
    const [ticket, setTicket] = useState(false)


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleSurvey = () => {
        console.log('survey');
    };

    //later get image.id and delete by id "now with email and url"
    const handleDelPic = async (url) => {
        deletePhoto({
            variables: {
                // user: context.userId,
                email: context.email,
                url: url
            }
        })
        context.deletePhoto(url)
    }

    //search how to add image file and get url back 

    function onImageChange(event) {

        let img = event.target.files[0];

        const url = 'https://i1.sndcdn.com/artworks-000073403402-fo1jga-t500x500.jpg'

        addPhoto({
            variables: {
                email: context.email,
                url: url
            }
        })

    };

    function handleProfilePic(url) {

        addProfilePhoto({
            variables: {
                email: context.email,
                profilePhoto: url
            }
        })
    }

    const LinearProgressWithLabel = (props) => {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    const { name, surename, photos, abonnement, profilePhoto, gender } = context


    return (
        <Grid container spacing={3} className='profile'>
            <Grid item xs={3} sm={3} >
                {/* <GoogleMapContainer /> */}
                <ProfileLeft />
            </Grid>

            <Grid item xs={3} sm={6} className='profile__middel'>

                <section className='profile__middel__pics'>
                    <Chip
                        label="Your Photos"
                        className='profile__middel__pics__title'
                        size='medium'
                        variant='outlined'
                        style={{ backgroundColor: '#424242', color: '#fff' }}
                    />
                    <div className='profile__middel__pics__cards'>
                        {
                            photos.map((item, index) => {
                                return (
                                    <Cards
                                        url={item.url}
                                        key={index}
                                        favTitle='Make it your profile picture'
                                        delTitle='Delete!'
                                        handleProfilePic={handleProfilePic}
                                        handleDelPic={handleDelPic}

                                    />

                                )
                            })
                        }

                    </div>

                    <Button
                        variant="contained"
                        component="label"
                        onChange={onImageChange}
                    >
                        Upload Image
                        <input
                            type="file"
                            hidden
                        />
                    </Button>

                </section>

                <section className='profile__middel__account'>
                    <Chip
                        label="Account"
                        className='profile__middel__pics__title'
                        size='medium'
                        variant='outlined'
                        style={{ backgroundColor: '#424242', color: '#fff', borderColor: "hsl(209, 23%, 60%)" }}
                    />
                    {
                        <div >
                            <section className='profile__middel__account__section'>
                                <FormLabel >Account type</FormLabel>
                                <Chip
                                    icon={abonnement ? <DoneIcon /> : <ClearIcon />}
                                    label={abonnement ? abonnement.type : 'Basic'}
                                    color="primary"
                                    variant="outlined"
                                    size='medium'
                                />
                            </section>

                            <section className='profile__middel__account__section'>
                                <FormLabel htmlFor="" >Remaining time</FormLabel>
                                <Chip
                                    icon={<HourglassFullIcon />}
                                    label={abonnement ? abonnement.days + ' Days' : '0 Days'}
                                    color="primary"
                                    variant="outlined"
                                    size='medium'
                                />
                            </section>
                        </div>
                    }

                    <section className='profile__middel__account__section'>
                        <FormLabel htmlFor="" >Tickets</FormLabel>
                        <Chip
                            icon={<ConfirmationNumberIcon />}
                            label={context.ticket}
                            color="primary"
                            variant="outlined"
                            size='medium'
                        />
                    </section>
                </section>

                <section className='profile__middel__survey'>
                    <Tooltip
                        title="Compelete survey below for optimal friend suggestions"
                        aria-label="add"
                        enterDelay={500}
                        leaveDelay={200}
                    >
                        <Link to='/survey'>
                            <Button
                                variant="contained"
                                onClick={handleSurvey}
                            >
                                Survey
                         </Button>
                        </Link>
                    </Tooltip>
                    <LinearProgressWithLabel value={progress} />

                    {/* <Survey/> */}
                </section>

            </Grid>

            <Grid item xs={3} sm={3} className='profile__right'>
                <div className='profile__right__title'>
                    {context.gender === 'female' &&
                        < section className='profile__right__gender-icon'>
                            <FontAwesomeIcon icon={faVenus} size='3x' />
                        </section>
                    }
                    {context.gender === 'male' &&
                        < section className='profile__right__gender-icon'>
                            <FontAwesomeIcon icon={faMars} size='3x' />
                        </section>
                    }
                    <Chip
                        icon={!context.gender && <FaceIcon />}
                        label={`${name} ${surename} `}
                        color="secondary"
                        variant="outlined"
                        size='medium'
                    />
                </div>
                <div className='profile__right__buttons'>
                    <div className=' button-white'>
                        <Button variant="outlined" color="primary" onClick={() => { setBuyPrem(true) }}>
                            Buy Premium
                    </Button>
                    </div>

                    {buyPrem && <FadeBackground />}

                    {buyPrem && <Modal
                        title="Buy Premium"
                        isCancel
                        onCancel={() => setBuyPrem(false)}
                    >
                        <BuyPrem />
                    </Modal>}

                    <div className=' button-white'>
                        <Button variant="outlined" color="primary" onClick={() => { setTicket(true) }}>
                            Buy Ticket
                        </Button>
                    </div>
                    {ticket && <FadeBackground />}

                    {ticket && <Modal
                        title="Buy Premium"
                        isCancel
                        onCancel={() => setTicket(false)}
                    >
                        <BuyTicket />
                    </Modal>}
                </div>

                <Divider className='divider' />

                <div className='profile__right__ads'>
                    <Paper elevation={3} variant="outlined" className='profile__right__ads__paper'>
                        ads
                    </Paper>
                </div>

                <div className='profile__right__dashboard-button'>
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" >
                            Dashboard
                         </Button>
                    </Link>
                </div>
            </Grid>
        </Grid >

    )
}


export default MyProfile