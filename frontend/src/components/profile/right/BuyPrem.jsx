import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, Button, CardContent, Typography } from '@material-ui/core';
import './BuyTicket.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContextProvider'
import { Snackbar } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
});

export default function BuyPrem() {

    const context = useContext(UserContext);

    const classes = useStyles();

    const [premium, setPremium] = useState([
        {
            amount: 1,
            price: 15,
            image: 'https://galaxytv.network/wp-content/uploads/2020/01/1-month.png',
            desc: ' 1 month premium ',
            type: 'premium'

        },
        {
            amount: 3,
            price: 40,
            image: 'http://www.medzsoft.com/public/assets/images/3m.png',
            desc: ' 3 month premium ',
            type: 'premium'
        },
        {
            amount: 6,
            price: 80,
            image: 'http://www.medzsoft.com/public/assets/images/6m.png',
            desc: ' 6 month premium ',
            type: 'premium'
        },
        {
            amount: 12,
            price: 140,
            image: 'http://www.medzsoft.com/public/assets/images/12.png',
            desc: ' One year premium',
            type: 'premium'
        },
    ])

    const [snackbarError, setSnackbarError] = useState(false)


    const handleCheckOut = (item) => {
        if (context.abonnement === undefined) {
            context.setPayPal(item)
        } else {
            setSnackbarError(true)
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarError(false);
    };
    return (
        <>
            <div className='ticket__container'>
                {
                    premium.map((item, index) => {
                        const { image, amount, price, desc } = item
                        return (
                            <Link
                                key={index}
                                to={context.abonnement === undefined ? '/paypal' : '/profile'}
                                className='ticket__items'
                                onClick={() => handleCheckOut(item)}
                            >
                                < Card key={index} >
                                    <CardActionArea >
                                        <CardMedia
                                            className={classes.media}
                                            image={image}
                                            title={amount}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {desc}
                                            </Typography>
                                            <Typography component="h1">
                                                {price} $
                                          </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        )
                    })
                }
                <section className='snackbarOnError'>
                    <Snackbar
                        message='  You have already an Premium account'
                        key={'top' + 'center'}
                        open={snackbarError}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                    >
                    </Snackbar>

                </section>
            </div>
        </>
    )
}
