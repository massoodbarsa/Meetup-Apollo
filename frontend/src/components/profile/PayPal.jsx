import React, { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '../../context/UserContextProvider'
import { Snackbar } from '@material-ui/core';
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../pages/graphqlQuery/Mutation'
export default function PayPal(props) {

    const context = useContext(UserContext);

    const [snackbarSuccess, setSnackbarSuccess] = useState(false)
    const [snackbarError, setSnackbarError] = useState(false)

    const paypalRef = useRef()

    const [updateUser, { data: updateUserData }] = useMutation(UPDATE_USER);

    useEffect(() => {

        if (updateUserData) {
            console.log(updateUserData.updateUser.ticket);
            const ticket = updateUserData.updateUser
            context.updateTicketAmount(ticket)
        }
    }, [updateUserData])

    const { price, amount, desc, type } = context.payPal

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
                        description: `${desc}`,
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
                if (type === 'ticket') {
                    updateUser({
                        variables: {
                            email: context.email,
                            ticket: amount
                        }
                    })
                }

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
