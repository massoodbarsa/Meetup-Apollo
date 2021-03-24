import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};


export default function GoogleMapContainer(props) {


    useEffect(() => {
        getPosition()
    }, [])

    const getPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
        } else {
            alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
        }
    }


    // Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
    const posError = () => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(res => {
                if (res.state === 'denied') {
                    alert('Enable location permissions for this website in your browser settings.')
                }
            })
        } else {
            alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
        }
    }



    // Geolocation success callback fn
    const showPosition = (position) => {
        let lat = position.coords.latitude // You have obtained latitude coordinate!
        let long = position.coords.longitude // You have obtained longitude coordinate!

        console.log(lat);
        console.log(long);

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&AIzaSyB_q1rQIT3HgHWFYuGfnTfYPrqujSBncZk`)
            .then(res => res.json())
            .then(address => console.log(address))
    }


    // Fetching for google API key from back-end (Optional, you can store it in .env file in front-end)


    // Converting lat/long from browser geolocation into city, state, and zip code using Google Geocoding API
    // const getAddress = (lat, long) => {
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB_q1rQIT3HgHWFYuGfnTfYPrqujSBncZk`)
    //         .then(res => res.json())
    //         .then(address => console.log(address))
    // }

    const setZip = (address) => {
        let city = address.results[5].address_components[2].short_name
        let state = address.results[5].address_components[4].short_name
        let postal = address.results[5].address_components[0].short_name

        console.log(city);
        // props.set_city(city)
        // props.set_state(state)
        // props.set_postal_code(postal)
    }

    return (

        <p>selm</p>
        // <Map
        //     google={props.google}
        //     zoom={1}
        //     style={mapStyles}
        //     initialCenter={
        //         {
        //             lat: -1.2884,
        //             lng: 36.8233
        //         }
        //     }
        // />
    );

}

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyB_q1rQIT3HgHWFYuGfnTfYPrqujSBncZk'
// })(GoogleMapContainer);