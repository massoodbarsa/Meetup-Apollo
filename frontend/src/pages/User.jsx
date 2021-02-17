import React, { useState, useContext } from 'react'
import './User.scss'
import Modal from '../components/modal/modal'
import FadeBackground from '../components/modal/fadeBackground'
import { Button, Radio, RadioGroup, FormControlLabel, FormLabel, TextField } from '@material-ui/core';
import { UserContext } from '../context/UserContextProvider'

import { useQuery, gql } from '@apollo/client'
// import { LOGIN } from './graphqlQuery/Queries'


function User(props) {

    const context = useContext(UserContext);

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

        let reqBody = {
            // query: `
            // query{
            //     login(email:"${email}", password:"${password}"){
            //         userId 
            //         token 
            //         tokenExpiration   
            //     }
            // }
            // `
            query: `
            query{
                login(email:"${email}", password:"${password}"){
                    name
                    email 
                    surename
                    age
                    profilePhoto
                    photos{
                        url
                      }
                    abonnement{
                        name
                        price
                        discount
                        tickets
                        startDate
                        days
                      }
                }
            }
            `
        }

        if (signUp) {

            if (passRep !== password) {

                setTextField(true)

                return
            }
            reqBody = {
                query: `
                mutation{
                    addUser(email:"${email}",password:"${password}",name:"amir"){
                        email
                        name
                        password
                        surename
                        age
                        profilePhoto 
                      }
                }
                `
            }
        }

        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('fetching failed')
                }
                return res.json()
            })
            .then(resData => {
                if (resData.data.login.name) {

                    // context.login(resData.data.login.token, resData.data.login.userId, resData.data.tokenExpiration)

                    const { email, name, surename, age, photos, profilePhoto, abonnement } = resData.data.login

                    context.setUserState(name, email, surename, age, photos, profilePhoto, abonnement)
                    context.login(email, name)
                }

            })
            .catch(err => {
                console.log(err);
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

    // console.log(props);
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