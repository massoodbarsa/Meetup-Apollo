import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';


export default function Country({ handleLocation, location }) {

    const [all, setAll] = useState([])
    const [country, setCountry] = React.useState(location);


    const handleChange = (value) => {
        setCountry(value)
        handleLocation(value)
    }

    useEffect(() => {
        fetchCountriesData()
    }, [country])

    const fetchCountriesData = async () => {
        const url = 'https://restcountries.eu/rest/v2/all'
        const response = await (await fetch(url)).json()
        setAll(response)
    }

    const countries = all.map(item => {
        return (
            <MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>
        )
    })

    return (
        <>
            <h2>Where do you live? </h2>
            <div className='slide-container selectButton'>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={country}
                        onChange={(e) => handleChange(e.target.value)}
                        variant='filled'
                        autoWidth
                    >
                        {countries}

                    </Select>
                </FormControl>
            </div>
        </>
    );
}
