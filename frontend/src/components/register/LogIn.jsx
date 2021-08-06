import React from 'react'
import { Button, TextField} from '@material-ui/core';

export default function LogIn({ setEmai, setPass, submitHandler }) {
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className='user-form__control'>

                    <TextField
                        id="textfield"
                        label="Email"
                        margin='normal'
                        size='medium'
                        onChange={(e) => setEmai(e.target.value)}
                    />
                    <TextField
                        id="textfield"
                        label="Password"
                        margin='normal'
                        type='password'
                        size='medium'
                        onChange={(e) => setPass(e.target.value)}
                    />

                </div>
                <div className='button-gray'>
                    <Button
                        variant="contained"
                        type='submit'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </>
    )
}
