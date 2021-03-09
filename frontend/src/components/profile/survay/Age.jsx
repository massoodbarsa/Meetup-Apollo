import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons'
import { Slider, Typography, Tooltip } from '@material-ui/core/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';




const useStyles = makeStyles((theme) => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
    },
    margin: {
        height: theme.spacing(3),
    },
    color: {
        color: '#fff'
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



const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 25,
        backgroundColor: '#52af77',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {
        color: '#fff'
    },
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function Age() {

    const [value, setvalue] = useState('')

    const classes = useStyles();
    const ageMarks = [
        {
            value: 18,
            label: '18',
        }
    ];

    return (
        <>
            <h2>Prreferd Age ? </h2>

            <div className='slide-container'>
                <section className='slide-container__slider'>
                    <div className={classes.root}>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="slider"
                            defaultValue={18}
                            max={80}
                            min={18}
                            marks={ageMarks}

                        />
                        <div className={classes.margin} />
                    </div>
                </section>
            </div>

        </>
    )
} 
