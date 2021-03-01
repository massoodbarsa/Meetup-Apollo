import React, { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '../../context/UserContextProvider'

export default function PayPal() {

    const context = useContext(UserContext);
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)

    const paypalRef = useRef()

    const { price, image, amount } = context.payPal


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
                setPaidFor(true)
                console.log(order);
            },
            onError: err => {
                setError(err)
                console.log(err);
            }
        }).render(paypalRef.current)
    }, [amount])




    if (paidFor) {
        return (
            <div>
                Thanks for making the purchase
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error in processing payment , please try again
            </div>
        )
    }



    return (
        <div>
            <p>To be paid:{price}</p>
            <div ref={paypalRef} />
        </div>
    )
}
