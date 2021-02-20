import React, { useState, useContext, useEffect } from 'react'
import './User.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'
import { Button, TextField } from '@material-ui/core';
import { UserContext } from '../context/UserContextProvider'
import { ADD_USER, LOGIN } from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'


function User(props) {

    const context = useContext(UserContext);

    const [addUser, { newUserData, }] = useMutation(ADD_USER);
    const [login, { data }] = useMutation(LOGIN);

    useEffect(() => {
        if (data) {
            context.login(data.login)

            context.setUserState(data.login)
        }
    }, [data])

    const [signUp, setSignUp] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [gender, setGender] = useState('')
    const [textField, setTextField] = useState(false)
    const [email, setEmai] = useState(null)
    const [password, setPass] = useState(null)
    const [passRep, setPassRep] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        if (signUp) {

            if (passRep !== password) {

                setTextField(true)

                return
            }

            addUser({
                variables: {
                    email: email,
                    password: password
                }
            })
        }

        login({
            variables: {
                email: email,
                password: password
            }
        })

        setSignUp(false)
        setTextField(false)
    }

    const modalCancelHandler = () => {

        setSignUp(false)

    }

    const modalOpenHandler = () => {
        setSignUp(true)
    }

    return (
        <>
            <form className='user-form' onSubmit={submitHandler}>
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
                <div >
                    <Button
                        variant="contained"
                        type='submit'
                    >
                        Login
                    </Button>
                </div>
            </form>
            <div >
                <Button
                    variant="contained"
                    // color="primary"
                    onClick={modalOpenHandler}
                >
                    Signup
                </Button>
            </div>

            <div className="signup">
                {signUp && <FadeBackground />}

                {signUp && <Modal
                    title="Signup"
                    isCancel
                    onCancel={modalCancelHandler}
                >
                    <form className='user-form' onSubmit={submitHandler}>
                        <div className='user-form__control'>

                            <TextField
                                id="textfield"
                                label="Email"
                                margin='normal'
                                size='medium'
                                error={textField}
                                onChange={(e) => setEmai(e.target.value)}


                            />
                            <TextField
                                id="textfield"
                                label="Password"
                                margin='normal'
                                type='password'
                                size='medium'
                                error={textField}
                                onChange={(e) => setPass(e.target.value)}

                            />

                            <TextField
                                id="textfield"
                                label="Retype-Password"
                                margin='normal'
                                type='password'
                                size='medium'
                                error={textField}
                                onChange={(e) => setPassRep(e.target.value)}

                            />

                        </div>

                        <div>
                            <div className='modal-from'>
                                {/* <div >
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        gender={gender}
                                        onChange={(e, value) => { setGender(value) }}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <FormLabel component="legend">Looking for</FormLabel>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender2"
                                        gender={gender}
                                        onChange={(e, value) => { setGender(value) }}>
                                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                    </RadioGroup>
                                </div> */}
                            </div>
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
                }
            </div>
        </>
    )
}

export default User