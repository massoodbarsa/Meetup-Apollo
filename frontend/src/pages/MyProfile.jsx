import React, { useState, useContext, useEffect } from 'react'
import Cards from '../components/dashboard/Cards'
import './Profile.scss'
import { Grid, Chip, Button, Tooltip, FormLabel, Popover, Divider, Box, LinearProgress, Paper, Typography, TextareaAutosize, Input } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider'
import CircularProgress from '@material-ui/core/CircularProgress';
import BuyPrem from '../components/profile/BuyPrem';
import BuyTicket from '../components/profile/BuyTicket';
import FadeBackground from '../components/modal/fadeBackground'
import Modal from '../components/modal/modal'
import Slider from '../components/dashboard/Slider';
import { ADD_PHOTO ,DEL_PHOTO} from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'



function MyProfile() {

    const context = useContext(UserContext);

    const [addPhoto, { data:addPhotoData }] = useMutation(ADD_PHOTO);
    const [deletePhoto, { data:delPhotoData }] = useMutation(DEL_PHOTO);


    useEffect(() => {
        if (addPhotoData) {
            console.log(addPhotoData);
            context.addNewPhoto(addPhotoData.addPhoto.url)
        }
    }, [addPhotoData])

    const [anchorEl, setAnchorEl] = useState(null)
    const [progress, setProgress] = useState(20)
    const [age, setAge] = useState(context.age)
    const [buyPrem, setBuyPrem] = useState(false)
    const [ticket, setTicket] = useState(false)


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleSurvay = () => {
        console.log('survay');
    };

    //later get image.id and delete by id "now with email and url"
    const handleDelPic = async (url) => {
        deletePhoto({
            variables: {
                email: context.email,
                url: url
            }
        })
        context.deletePhoto(url)
    }

    //search how to add image file and get url back 

    async function onImageChange(event) {

        let img = event.target.files[0];

        const url = 'https://z-p3-scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/126121370_4102785083069706_4348566771372785185_o.jpg?_nc_cat=105&ccb=3&_nc_sid=8bfeb9&_nc_ohc=o8uJAbBaIvUAX9OZpbt&_nc_ht=z-p3-scontent-amt2-1.xx&oh=0b37063643d4268a21f0d4b16900faab&oe=604EAE76'

        addPhoto({
            variables: {
                email: context.email,
                url: url
            }
        })

    };

    async function handleProfilePic(url) {

        const reqBody = {
            query: `
            mutation  {
                addProfilePhoto(email:"${context.email}",profilePhoto:"${url}") {
                    email,
                    profilePhoto
                  }
                }
              `
        };

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                // Authorization: this.context.token

            }

        })

        const json = await response.json()

        const { profilePhoto, email } = await json.data.addProfilePhoto

        context.setProfilePic(profilePhoto)

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

    const { name, surename, photos, abonnement, profilePhoto } = context


    return (
        <Grid container spacing={3} className='profile'>
            <Grid item xs={3} sm={3} className='profile__left'>
                {profilePhoto ? <img src={profilePhoto} className='profile__left__img' /> : <CircularProgress color="secondary"></CircularProgress>}

                <section className='profile__left__info'>
                    <FormLabel className='profile__left__info__label'>Location</FormLabel>
                    <input type="text" />
                    <FormLabel className='profile__left__info__label'>Age</FormLabel>
                    <input type="number" value={age || 'Say later'} onChange={(e) => { setAge(e.target.value) }} />

                    <FormLabel className='profile__left__info__label'>About me</FormLabel>
                    <TextareaAutosize aria-label="minimum height" rowsMin={5} className='profile__left__info__textarea' />
                    {/* <Avatar alt="Cindy Baker" src="https://astrograph.com/free-horoscope/images/3GeminiHoroscope.png" /> */}
                </section>

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

                        {/* <Slider photo={photos} comp='myprofile'/> */}

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
                        abonnement.map((item, index) => {
                            return (
                                <div key={index}>
                                    <section className='profile__middel__account__section'>
                                        <FormLabel >Account type</FormLabel>

                                        <Chip
                                            icon={<DoneIcon />}
                                            label={item.name}
                                            color="primary"
                                            variant="outlined"
                                            size='medium'
                                        />
                                    </section>

                                    <section className='profile__middel__account__section'>
                                        <FormLabel htmlFor="" >Remaining time</FormLabel>
                                        <Chip
                                            icon={<HourglassFullIcon />}
                                            label={item.days}
                                            color="primary"
                                            variant="outlined"
                                            size='medium'
                                        />
                                    </section>

                                    <section className='profile__middel__account__section'>
                                        <FormLabel htmlFor="" >Tickets</FormLabel>
                                        <Chip
                                            icon={<ConfirmationNumberIcon />}
                                            label={item.tickets}
                                            color="primary"
                                            variant="outlined"
                                            size='medium'
                                        />
                                    </section>
                                </div>

                            )
                        })
                    }
                </section>

                <section className='profile__middel__survey'>
                    <Tooltip
                        title="Compelete survey below for optimal friend suggestions"
                        aria-label="add"
                        enterDelay={500}
                        leaveDelay={200}
                    >
                        <Button
                            variant="contained"
                            // color="primary"
                            onClick={handleSurvay}
                        >
                            Survay
                         </Button>
                    </Tooltip>
                    <LinearProgressWithLabel value={progress} />
                </section>

            </Grid>

            <Grid item xs={3} sm={3} className='profile__right'>
                <div className='profile__right__title'>

                    <Chip
                        icon={<FaceIcon />}
                        label={`${name} ${surename} `}
                        color="secondary"
                        variant="outlined"
                        size='medium'
                    />
                </div>
                <div className='profile__right__buttons'>
                    <Button variant="outlined" color="primary" onClick={(e) => { setBuyPrem(true) }}>
                        Buy Premium
                    </Button>

                    {buyPrem && <FadeBackground />}

                    {buyPrem && <Modal
                        title="Buy Premium"
                        isCancel
                        onCancel={() => setBuyPrem(false)}
                    >
                        <BuyPrem />
                    </Modal>}

                    <Button variant="outlined" color="primary" onClick={(e) => { setTicket(true) }}>
                        Buy Ticket
                        </Button>

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
        </Grid>

    )
}


export default MyProfile