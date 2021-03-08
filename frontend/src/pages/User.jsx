import React, { useState, useContext, useEffect } from 'react'
import './User.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'
import { Button, TextField, Snackbar, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { UserContext } from '../context/UserContextProvider'
import { ADD_USER, LOGIN } from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'


function User(props) {


    const context = useContext(UserContext);

    const [addUser, { data: newUserData }] = useMutation(ADD_USER);
    const [login, { data }] = useMutation(LOGIN);

    const [signUp, setSignUp] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const [gender, setGender] = useState('')
    const [textField, setTextField] = useState(false)
    const [email, setEmai] = useState(null)
    const [password, setPass] = useState(null)
    const [passRep, setPassRep] = useState(false)
    const [messageInfo, setMessageInfo] = useState(null);
    const [name, setName] = useState(null)
    const [surename, setSurename] = useState(null)


    

    useEffect(() => {
        if (data) {
            if (data.login === null) {
                console.log(data.login === null)

                setMessageInfo("Username or Password is not correct !")
                setSnackbar(true)
            } else {
                console.log(data.login);
                context.login(data.login)
                context.setUserState(data.login)
            }

        }
    }, [data])

    useEffect(() => {
        if (newUserData) {
            const { addUser } = newUserData
            if (!addUser) {
                setMessageInfo('User is already exist')
                setSnackbar(true)
            } else {
                setSignUp(false)
            }
        }
    }, [newUserData])

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    const submitHandler = (e) => {
        e.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        if (signUp) {

            if (passRep !== password) {

                setTextField(true)
                setMessageInfo('The password is not match')
                setSnackbar(true)

                return
            }

            addUser(
                {
                    variables: {
                        email: email,
                        password: password,
                        name: name,
                        surename:surename,
                        gender: gender
                    }
                })
        }
        else {
            login({
                variables: {
                    email: email,
                    password: password
                }
            })
        }
        setTextField(false)
    }

    const modalCancelHandler = () => {

        setSignUp(false)

    }

    const modalOpenHandler = () => {
        setSignUp(true)
    }


    console.log(context);
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
                <div className='button-gray'>
                    <Button
                        variant="contained"
                        type='submit'
                    >
                        Login
                    </Button>
                </div>
                <section className='snackbarOnError'>
                    <Snackbar
                        // anchorOrigin={{ vertical, horizontal }}
                        message={messageInfo}
                        key={'top' + 'center'}
                        open={snackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                    >
                    </Snackbar>
                </section>
            </form>
            <div className='button-gray signup-btn'>
                <Button
                    variant="contained"
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
                                required
                            />
                            <TextField
                                id="textfield"
                                label="Password"
                                margin='normal'
                                type='password'
                                size='medium'
                                error={textField}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />

                            <TextField
                                id="textfield"
                                label="Retype-Password"
                                margin='normal'
                                type='password'
                                size='medium'
                                error={textField}
                                onChange={(e) => setPassRep(e.target.value)}
                                required
                            />
                            <TextField
                                id="textfield"
                                label="Name"
                                margin='normal'
                                type='text'
                                size='medium'
                                error={textField}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                              <TextField
                                id="textfield"
                                label="Surename"
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
                                <FormControlLabel value="female" control={<Radio required/>} label="Female" />
                                <FormControlLabel value="male" control={<Radio required/>} label="Male" />
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
                    <section className='snackbarOnError'>
                        <Snackbar
                            // anchorOrigin={{ vertical, horizontal }}
                            message={messageInfo}
                            key={'top' + 'center'}
                            open={snackbar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                        </Snackbar>
                    </section>
                </Modal>
                }
            </div>
        </>
    )
}

export default User