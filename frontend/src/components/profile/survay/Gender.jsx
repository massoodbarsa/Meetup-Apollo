import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons'

export default function Gender() {
    const [value, setvalue] = useState('')

    const handleClick = (item) => {
        setvalue(item)
    }
    return (
        <>
            <h2>What are you looking for? </h2>
            <div className='slide-container'>
                <section className={`slide-container__section  ${value === 'female' && 'active-btn'}`}>
                    <FontAwesomeIcon icon={faFemale} size='10x' onClick={() => handleClick('female')} />
                </section>

                <section className={`slide-container__section  ${value === 'male' && 'active-btn'}`}>
                    <FontAwesomeIcon icon={faMale} size='10x' onClick={() => handleClick('male')} />
                </section>
            </div>
        </>
    )
}
