import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, Button, CardContent, Typography } from '@material-ui/core';
import './BuyTicket.scss'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function BuyTicket() {

    const classes = useStyles();

    const [ticket, setTicket] = useState([
        {
            amount: 5,
            price: 5,
            image:'https://www.google.com/url?sa=i&url=http%3A%2F%2Fmetalheartpromotions.com%2F%3Fpage_id%3D27&psig=AOvVaw0zOX4m9sorqz2D2dB7_Hh_&ust=1614555796305000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDc5J2fi-8CFQAAAAAdAAAAABAh'

        },
        {
            amount: 10,
            price: 8,
            image: 'https://media.istockphoto.com/vectors/ticket-set-on-white-background-vector-id858867552?k=6&m=858867552&s=612x612&w=0&h=6GjxIjUfwZ6E4ZSOrbqlh4P6J53u6NUCgnNhm3hSCG8='
        },
        {
            amount: 50,
            price: 40,
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FDouble-Raffle-Tickets-500ct-Colors%2Fdp%2FB00QYHNLIQ&psig=AOvVaw0zOX4m9sorqz2D2dB7_Hh_&ust=1614555796305000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDc5J2fi-8CFQAAAAAdAAAAABAK'
        },
        {
            amount: 100,
            price: 70,
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eventbrite.co.uk%2Fblog%2Fticket-giveaways-on-social-media-ds00%2F&psig=AOvVaw0zOX4m9sorqz2D2dB7_Hh_&ust=1614555796305000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDc5J2fi-8CFQAAAAAdAAAAABAD'

        },
    ])

    const hnadleTicket = () => {
        console.log('ticket');
    }
    return (
        <div className='ticket__container'>
            {
                ticket.map((item, index) => {
                    const { image, amount, price } = item
                    return (
                        < Card className='ticket__items' key={index} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={image}
                                    title={amount}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                 </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                  </Button>
                            </CardActions> */}
                        </Card>
                    )
                })
            }
        </div>
    )
}
