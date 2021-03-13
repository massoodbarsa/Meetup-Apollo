import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons'

export default function Gender({handleGender}) {
    const [state, setState] = useState('')

    const handleClick = (item) => {
        setState(item)
        handleGender(item)
    }
    return (
        <>
            <h2>Looking for ? </h2>
            <div className='slide-container'>
                <section className={`slide-container__icon ${state === 'female' && 'active-btn'}`}>
                    <FontAwesomeIcon icon={faFemale} size='10x' onClick={() => handleClick('female')} />
                </section>

                <section className={`slide-container__icon  ${state === 'male' && 'active-btn'}`}>
                    <FontAwesomeIcon icon={faMale} size='10x' onClick={() => handleClick('male')} />
                </section>
            </div>
        </>
    )
}
