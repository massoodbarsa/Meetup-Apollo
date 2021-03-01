import React, { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '../../context/UserContextProvider'
import { Snackbar } from '@material-ui/core';

export default function PayPal(props) {

    const context = useContext(UserContext);

    const [snackbarSuccess, setSnackbarSuccess] = useState(false)
    const [snackbarError, setSnackbarError] = useState(false)

    const paypalRef = useRef()

    const { price, amount } = context.payPal

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarError(false);
        setSnackbarSuccess(false)
    };

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        description: `${amount} tickets is bought`,
                        amount: {
                            currency_code: 'USD',
                            value: price
                        }
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                setSnackbarSuccess(true)
                setTimeout(() => {
                    props.history.push({
                        pathname: "/profile",

                    });
                }, 3500)

            },
            onError: err => {
                setSnackbarError(true)
                console.log(err);
            }
        }).render(paypalRef.current)
    }, [amount])

    return (
        <div>
            <p>To be paid : {price}$</p>
            <div ref={paypalRef} />
            <section className='snackbarOnSuccess'>
                <Snackbar
                    message='Thanks for making the purchase'
                    key={'top' + 'center'}
                    open={snackbarSuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                </Snackbar>
            </section>

            <section className='snackbarOnError'>
                <Snackbar
                    message='  Error in processing payment , please try again'
                    key={'top' + 'center'}
                    open={snackbarError}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                </Snackbar>

            </section>
        </div>
    )
}
