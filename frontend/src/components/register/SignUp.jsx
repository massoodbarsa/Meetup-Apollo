import React from 'react'
import FadeBackground from '../../components/modal/fadeBackground'
import Modal from '../../components/modal/modal'

import { Button, TextField, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export default function SignUp({ submitHandler, textField, setPass, setPassRep, setSurename, setEmai, setName, setGender, gender,modalCancelHandler}) {

    return (
        <>
            <div className="signup">
                <FadeBackground />
                <Modal
                    title="Signup"
                    isCancel
                    onCancel={modalCancelHandler}
                >
                    <form className='user-form' onSubmit={submitHandler}>
                    <div className='user-form__control'>

                        <TextField
                            id="textfield"
                            margin='normal'
                            size='medium'
                            error={textField}
                            onChange={(e) => setEmai(e.target.value)}
                            required
                            placeholder='Email'
                        />
                        <TextField
                            id="textfield"
                            placeholder="Password"
                            margin='normal'
                            type='password'
                            size='medium'
                            error={textField}
                            onChange={(e) => setPass(e.target.value)}
                            required
                           
                        />

                        <TextField
                            id="textfield"
                            placeholder="Retype-Password"
                            margin='normal'
                            type='password'
                            size='medium'
                            error={textField}
                            onChange={(e) => setPassRep(e.target.value)}
                            required
                        />
                        <TextField
                            id="textfield"
                            placeholder="Name"
                            margin='normal'
                            type='text'
                            size='medium'
                            error={textField}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            id="textfield"
                            placeholder="Surename"
                            margin='normal'
                            type='text'
                            size='medium'
                            error={textField}
                            onChange={(e) => setSurename(e.target.value)}
                            required
                        />
                    </div>

                    <div className='gender' >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            className="gender__radio"
                            aria-label="gender"
                            name="gender"
                            gender={gender}
                            onChange={(e, value) => { setGender(value) }}
                        >
                            <FormControlLabel value="female" control={<Radio required />} label="Female" />
                            <FormControlLabel value="male" control={<Radio required />} label="Male" />
                        </RadioGroup>
                    </div>
                    <div >
                        <Button
                            variant="contained"
                            type='submit'
                            fullWidth='true'
                        >Signup</Button>
                    </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}
