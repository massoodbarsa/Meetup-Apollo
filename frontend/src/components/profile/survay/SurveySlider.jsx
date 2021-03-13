import React, { useState } from 'react'
import { Slider, Tooltip } from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
    },
    margin: {
        height: theme.spacing(3),
    },
}));


function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
    valueLabel: {
        left: "calc(-50% + 8px)"
    },
})(Slider);


export default function SurveySlider({ title, minimum, maximum, marks, defaultValue, handleAgeOrGender, name }) {

    const classes = useStyles();

    const handleChange = (value) => {
        handleAgeOrGender(value, name)
    }

    return (
        <>
            <h2>{title} </h2>

            <div className='slide-container'>
                <section className='slide-container__slider'>
                    <div className={classes.root}>
                        <AirbnbSlider
                            getAriaLabel={(index) => (index === 0 ? 'Minimum ' : 'Maximum ')}
                            defaultValue={defaultValue}
                            valueLabelDisplay="on"
                            marks={marks}
                            min={minimum}
                            max={maximum}
                            onChange={(e, value) => handleChange(value)}
                        />
                        <div className={classes.margin} />
                    </div>
                </section>
            </div>
        </>
    )
}
