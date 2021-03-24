import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, Button, CardContent, Typography } from '@material-ui/core';
import './BuyTicket.scss'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContextProvider'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
});

export default function BuyTicket() {

    const context = useContext(UserContext);

    const classes = useStyles();

    const [ticket, setTicket] = useState([
        {
            amount: 5,
            price: 5,
            image: 'https://carrollwoodpta.org/wp-content/uploads/2018/01/ticket-clipart-purge-clipart-ticket-85041.jpg',
            desc: ' 5 tickets',
            type: 'ticket'
        },
        {
            amount: 10,
            price: 8,
            image: 'https://media.istockphoto.com/vectors/ticket-set-on-white-background-vector-id858867552?k=6&m=858867552&s=612x612&w=0&h=6GjxIjUfwZ6E4ZSOrbqlh4P6J53u6NUCgnNhm3hSCG8=',
            desc: ' 10 tickets',
            type: 'ticket'
        },
        {
            amount: 50,
            price: 40,
            image: 'https://worm.org/wp-content/uploads/2016/04/tickets_worm.jpg',
            desc: ' 50 tickets',
            type: 'ticket'
        },
        {
            amount: 100,
            price: 70,
            image: 'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2016/09/06105011/ticket-giveaways.jpg',
            desc: ' 100 tickets',
            type: 'ticket'
        },
    ])

    const handleTicket = (item) => {
        context.setPayPal(item)
    }
    return (
        <>
            <div className='ticket__container'>
                {
                    ticket.map((item, index) => {
                        const { image, amount, price } = item
                        return (
                            <div key={index} className='ticket__items'>
                                <Link
                                    to='/paypal'
                                    onClick={() => handleTicket(item)}>
                                    < Card >
                                        <CardActionArea >
                                            <CardMedia
                                                className={classes.media}
                                                image={image}
                                                title={amount}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {amount} Tickets
                                            </Typography>
                                                <Typography component="h1">
                                                    {price} $
                                          </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
