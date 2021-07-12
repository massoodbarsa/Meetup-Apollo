import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContextProvider'
import ProfileRight from '../components/profile/right/ProfileRight';
import ProfileLeft from '../components/profile/left/ProfileLeft';
import Cards from '../components/common/Cards'
import './Profile.scss'
import { Link } from 'react-router-dom'

import { ADD_PHOTO, DEL_PHOTO, SET_PROFILE_PHOTO } from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'

import { Grid, Chip, Button, Tooltip, FormLabel, Box, LinearProgress, Typography } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';


// import { Map, GoogleApiWrapper } from 'google-maps-react';
// import GoogleMapContainer from '../components/profile/right/GoogleMapContainer';
import axios from 'axios'

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
                    let elementProcent = 100 / (preferencesLength - 1);
                    survayProcent += elementProcent
                }
            }
        }
        setProgress(survayProcent)
    }, [])

    const [anchorEl, setAnchorEl] = useState(null)
    const [progress, setProgress] = useState()

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

    async function onImageChange(event) {

        let img = event.target.files[0];

        const formData = new FormData()
        formData.append('file', img)

        try {
            const response = await axios.post('http://localhost:4000/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const { fileName, filePath } = response.data
            // setUploadedFile({ fileName, filePath })

            addPhoto({
                variables: {
                    email: context.email,
                    url: filePath
                }
            })

        } catch (error) {
            if (error.response.status === 500) {
                console.log('problem with');

            } else {
                console.log(error.response.data.msg);
            }
        }

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

    const { photos, abonnement } = context

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
                            name='myImage'
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
                        <img src="/Users/amirshakiba/Desktop/Meetup-Apollo2/server/public/uploads/Hamid.Shakiba.jpg" alt="" />

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
                    <div className='profile__middel__survey__btn'>
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
                    </div>
                    <div className='profile__middel__survey__progress'>
                        <LinearProgressWithLabel value={progress} />
                    </div>
                </section>
            </Grid>

            <Grid item xs={3} sm={3}>
                <ProfileRight />
            </Grid>
        </Grid >

    )
}


export default MyProfile