import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Chip, Slider, Button, RadioGroup, FormControlLabel, FormLabel, Radio, Popover, Divider, Avatar } from '@material-ui/core/';
import { UserContext } from '../../../context/UserContextProvider'

export default function DashboardRight() {

    const context = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null)
    const [gender, setGender] = useState()

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

    return (
        < >
            <NavLink to='/profile'><Button variant="outlined" color="primary">
                <Avatar
                    variant='square'
                    alt='Profile'
                    src={`http://localhost:4000${context.profilePhoto} `}
                >
                </Avatar>
            </Button>
            </NavLink>
            <Divider className='divider' />

            <div className='dashboard__right__buttons  button-white'>
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
                        step={10}

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
        </>
    )
}
