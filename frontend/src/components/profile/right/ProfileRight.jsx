import React, { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContextProvider'
import Modal from '../../modal/modal'
import BuyPrem from './BuyPrem';
import BuyTicket from './BuyTicket';
import FadeBackground from '../../modal/fadeBackground'

import { Link } from 'react-router-dom'

import { Chip, Button, Divider, Paper } from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'


export default function ProfileRight() {
    const context = useContext(UserContext);

    const [buyPrem, setBuyPrem] = useState(false)
    const [ticket, setTicket] = useState(false)

    const { name, surename, photos, abonnement, profilePhoto, gender } = context

    return (
        <div className='profile__right'>
            <div className='profile__right__title'>
                {context.gender === 'female' &&
                    < section className='profile__right__gender-icon'>
                        <FontAwesomeIcon icon={faVenus} size='3x' />
                    </section>
                }
                {context.gender === 'male' &&
                    < section className='profile__right__gender-icon'>
                        <FontAwesomeIcon icon={faMars} size='3x' />
                    </section>
                }
                <Chip
                    icon={!context.gender && <FaceIcon />}
                    label={`${name} ${surename} `}
                    color="secondary"
                    variant="outlined"
                    size='medium'
                />
            </div>
            <div className='profile__right__buttons'>
                <div className=' button-white'>
                    <Button variant="outlined" color="primary" onClick={() => { setBuyPrem(true) }}>
                        Buy Premium
                    </Button>
                </div>

                {buyPrem && <FadeBackground />}

                {buyPrem && <Modal
                    title="Buy Premium"
                    isCancel
                    onCancel={() => setBuyPrem(false)}
                >
                    <BuyPrem />
                </Modal>}

                <div className=' button-white'>
                    <Button variant="outlined" color="primary" onClick={() => { setTicket(true) }}>
                        Buy Ticket
                        </Button>
                </div>
                {ticket && <FadeBackground />}

                {ticket && <Modal
                    title="Buy Premium"
                    isCancel
                    onCancel={() => setTicket(false)}
                >
                    <BuyTicket />
                </Modal>}
            </div>

            <Divider className='divider' />

            <div className='profile__right__ads'>
                <Paper elevation={3} variant="outlined" className='profile__right__ads__paper'>
                    ads
                    </Paper>
            </div>

            <div className='profile__right__dashboard-button'>
                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" >
                        Dashboard
                         </Button>
                </Link>
            </div>
        </div>
    )
}
