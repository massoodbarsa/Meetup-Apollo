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
        gender: null,
        aboutMe: '',
        place: null,
        height: null,
        photos: [],
        abonnement: null,
        preferences: null,
        usersData: [],
        payPal: null,
        favorites: []
    }

    // setUserState = ({ _id,email, name, surename, age, photos, profilePhoto, abonnement }) => {
    setUserState = ({ email, name, surename, age, photos, ticket, profilePhoto, abonnement, gender, aboutMe, place, height, preferences, favorites }) => {
        this.setState({
            // userId: _id,
            email,
            name,
            surename,
            age,
            photos,
            profilePhoto,
            abonnement: abonnement[0],
            ticket,
            gender,
            aboutMe,
            place,
            height,
            preferences: preferences[0],
            favorites


        })
    }
    //whole update methodes should be use updateuser?

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
    //whole update methodes should be use updateuser?
    setPayPal = (payPal) => {
        this.setState({
            payPal: payPal
        })
    }
    //whole update methodes should be use updateuser?

    updateTicketAmount = ({ ticket }) => {
        this.setState({
            ticket
        })
    }
    //whole update methodes should be use updateuser?

    updateAbonnement = (abonnement) => {
        this.setState({
            abonnement
        })
    }

    updatePreferences = (preferences) => {
        console.log(preferences);
        this.setState({
            preferences
        })
    }

    updateUser = ({ name, surename, age, aboutMe, place, height }) => {
        console.log(name, surename, age, aboutMe, place, height);
        this.setState({
            name,
            surename,
            age,
            aboutMe,
            place,
            height
        })
    }


    addFavorites = (favorite) => {

        const favorites = {
            favorite: favorite
        }

        this.setState({
            favorites: [...this.state.favorites, favorites]
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
        updateTicketAmount: this.updateTicketAmount,
        updateAbonnement: this.updateAbonnement,
        updateUser: this.updateUser,
        updatePreferences: this.updatePreferences,
        addFavorites: this.addFavorites
    }

    render() {
        return (
            <UserContext.Provider value={{ ...this.state, ...this.valueObj }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
