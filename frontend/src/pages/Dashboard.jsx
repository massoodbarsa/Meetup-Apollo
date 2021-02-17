import React, { useState, useContext, useEffect } from 'react'
import Cards from '../components/dashboard/Cards'
import './Dashboard.scss'
import { Grid, Chip, Slider, Button, RadioGroup, FormControlLabel, FormLabel, Radio, Popover, Divider, Avatar } from '@material-ui/core/';
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider'
import ImageSlider from '../components/dashboard/Slider'

import { useQuery, gql } from '@apollo/client'
import { GET_USERS } from './graphqlQuery/Queries'

function Dashboard() {

    const context = useContext(UserContext);

    const { error, loading, data } = useQuery(GET_USERS)

    useEffect(() => {
        if (data) {
            context.setUsers(data.getUsers)
        }
    }, [data])

    const [gender, setGender] = useState()
    const [anchorEl, setAnchorEl] = useState(null)

    const distanceMarks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 25,
            label: '25 km',
        },
        {
            value: 50,
            label: '50 Km',
        },
        {
            value: 75,
            label: '75 Km',
        },
        {
            value: 100,
            label: '100 Km',
        },
    ];
    const ageMarks = [
        {
            value: 18,
            label: '18',
        }
    ];

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const { usersData } = context

    const photos = usersData.map(i => i.photos.map(item => item))

    const photo = photos.map(items => items.map(item => item))
    
    return (
        <Grid container spacing={3} className='dashboard'>
            <Grid item xs={3} sm={3} className='dashboard__left'>

                <h2>Messenger</h2>
            </Grid>


            <Grid item xs={3} sm={6} className='dashboard__middel'>

                <section className='dashboard__middel__top-matches'>
                    <Chip
                        label="Top 5 Matches"
                        // color='primary'
                        className='dashboard__middel__top-matches__title'
                        size='medium'
                        variant='outlined'
                        style={{ backgroundColor: '#424242', color: '#fff' }}

                    />

                    <div className='dashboard__middel__top-matches__cards'>
                        <Cards title='title' />
                        <Cards title='title' />
                    </div>
                </section>

                <section className='dashboard__middel__corossol'>
                    <ImageSlider photo={photo} comp='dashboard' />
                </section>
            </Grid>

            <Grid item xs={3} sm={3} className='dashboard__right'>
                <NavLink to='/profile'><Button variant="outlined" color="primary">
                    <Avatar
                        variant='square'
                        alt='Profile'
                        src={context.profilePhoto}
                    >
                    </Avatar>
                </Button>
                </NavLink>
                <Divider className='divider' />

                <div className='dashboard__right__buttons'>
                    <Button variant="outlined" color="primary" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        Viewers
                        </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorPosition={{ top: 200, left: 400 }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                    >
                        <h1 >The content of the Popover.</h1>
                    </Popover>

                    <Button variant="outlined" color="primary" onClick={(e) => setAnchorEl(e.currentTarget)}>
                        Favorites
                        </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        // anchorReference="anchorPosition"
                        anchorPosition={{ top: 200, left: 400 }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                    >
                        <h1 >The content of the Popover.</h1>
                    </Popover>
                </div>
                <Divider className='divider' />

                <div className='dashboard__right__slider'>
                    <div className='slider'>

                        <Slider
                            defaultValue={10}
                            // getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={10}
                            marks={distanceMarks}
                            valueLabelDisplay="on"
                        />

                        <Chip
                            label="Distance"
                            color='secondary'
                            className='dashboard__middel__top-matches__title'
                            size='medium'
                            variant='outlined'
                        />

                    </div>
                    <div className='slider'>
                        <Slider
                            defaultValue={18}
                            // getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            marks={ageMarks}
                            valueLabelDisplay="on"
                        />

                        <Chip
                            label="Age"
                            color='secondary'
                            className='dashboard__middel__top-matches__title'
                            size='medium'
                            variant='outlined'
                        />
                    </div>
                    <div className='slider'>
                        <FormLabel component="legend" className='slider__label'>Looking for</FormLabel>
                        <RadioGroup className='slider__gender' aria-label="gender" name="gender2" gender={gender} onChange={(e) => { setGender(e.target.value) }} >
                            <FormControlLabel value="female" control={<Radio size='small' color="secondary" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio size='small' color="primary" />} label="Male" />
                        </RadioGroup>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Dashboard