import React, { useState, useContext, useEffect } from 'react'
import './Register.scss'
import { Button, Snackbar } from '@material-ui/core';
import { UserContext } from '../context/UserContextProvider'
import { ADD_USER, LOGIN } from './graphqlQuery/Mutation'
import { useMutation } from '@apollo/client'
import LogIn from '../components/register/LogIn';
import SignUp from '../components/register/SignUp';

function User(props) {

    const context = useContext(UserContext);

    const [addUser, { data: newUserData }] = useMutation(ADD_USER);
    const [login, { data }] = useMutation(LOGIN);

    const [signUp, setSignUp] = useState(false)
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
                setMessageInfo("Username or Password is not correct !")
                setSnackbar(true)
            } else {
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
                        surename: surename,
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
        setTextField(false)
    }

    const modalOpenHandler = () => {
        setSignUp(true)
    }

    return (
        <>
            <div className='user-form' onSubmit={submitHandler}>

                <LogIn setEmai={setEmai} setPass={setPass} submitHandler={submitHandler} />
                {signUp && <SignUp
                    setSignUp={setSignUp}
                    textField={textField}
                    setEmai={setEmai}
                    setPass={setPass}
                    setPassRep={setPassRep}
                    setEmai={setEmai}
                    setName={setName}
                    setSurename={setSurename}
                    setGender={setGender}
                    gender={gender}
                    submitHandler={submitHandler}
                    modalCancelHandler={modalCancelHandler}
                />
                }

                <div className='button-gray signup-btn'>
                    <Button
                        variant="contained"
                        onClick={modalOpenHandler}
                    >
                        Signup
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
            </div>
        </>
    )
}

export default User