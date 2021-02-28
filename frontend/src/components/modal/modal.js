import React from 'react'
import './modal.scss'
import { Button } from '@material-ui/core';



const modal = props => (

    <div className='modal'>
        <header className='modal__header'><h2>{props.title}</h2></header>
        <section className='modal__content'>
            {props.children}
        </section>
        <section className='modal__actions'>
            {props.isCancel && <div  className='button-red'><Button variant="contained" onClick={props.onCancel}>Cancel</Button></div>}
            {props.isConfirm && <Button  color='secondary'variant="contained" onClick={props.onConfirm}>{props.confirmText}</Button>}
        </section>
    </div>

)

export default modal