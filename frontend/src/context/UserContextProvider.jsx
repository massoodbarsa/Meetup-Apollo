import React, { Component } from 'react'
import { createContext } from 'react'

export const UserContext = createContext()

export default class UserContextProvider extends Component {

    state = {
        // userId:null,
        email: null,
        name: null,
        surename: null,
        age: null,
        profilePhoto: '',
        ticket: null,
        photos: [],
        abonnement: [],
        usersData: [],
        payPal: null
    }

    // setUserState = ({ _id,email, name, surename, age, photos, profilePhoto, abonnement }) => {
    setUserState = ({ email, name, surename, age, photos, ticket, profilePhoto, abonnement }) => {
        this.setState({
            // userId: _id,
            email,
            name,
            surename,
            age,
            photos,
            profilePhoto,
            abonnement,
            ticket
        })
    }

    setProfilePic = (profilePhoto) => {
        this.setState({
            profilePhoto
        })

    }

    setUsers = (usersArray) => {
        this.setState({
            usersData: usersArray
        })

    }

    addNewPhoto = (url) => {
        const photos = {
            url: url
        }

        this.setState({
            photos: [...this.state.photos, photos]
        })
    }

    deletePhoto = (url) => {
        //now if you have 2 pic with same url delete both because of knowing it by url .later use imageId from database
        const photos = this.state.photos.filter(item => item.url !== url)

        this.setState({
            photos
        })

    }

    login = ({ email, name }, tokenExpiration) => {
        this.setState({
            email,
            name
        })
    }

    logout = () => {
        this.setState({
            email: null,
            name: null
        })
    }

    setPayPal = (payPal) => {
        this.setState({
            payPal: payPal
        })
    }

    updateTicketAmount = ({ ticket }) => {
        this.setState({
            ticket
        })
    }


    valueObj = {
        login: this.login,
        logout: this.logout,
        setUserState: this.setUserState,
        setProfilePic: this.setProfilePic,
        setUsers: this.setUsers,
        addNewPhoto: this.addNewPhoto,
        deletePhoto: this.deletePhoto,
        setPayPal: this.setPayPal,
        updateTicketAmount: this.updateTicketAmount
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, ...this.valueObj }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
