import React, { useState, useContext, useEffect } from 'react'
import Cards from '../components/common/Cards'
import './Dashboard.scss'
import { Grid, Chip } from '@material-ui/core/';
import { UserContext } from '../context/UserContextProvider'
import ImageSlider from '../components/common/Slider'
import DashboardRight from '../components/dashboard/Right/DashboardRight'

import { useQuery } from '@apollo/client'
import { GET_USERS } from './graphqlQuery/Queries'

function Dashboard() {

    const context = useContext(UserContext);

    const { error, loading, data } = useQuery(GET_USERS)

    useEffect(() => {
        if (data) {
            context.setUsers(data.getUsers)
        }
    }, [data])

    const { usersData } = context

    return (
        <Grid container spacing={3} className='dashboard'>
            <Grid item xs={3} sm={3} className='dashboard__left'>

                <h2>Messenger</h2>
            </Grid>


            <Grid item xs={3} sm={6} className='dashboard__middel'>

                <section className='dashboard__middel__top-matches'>
                    <Chip
                        label="Top 5 Matches"
                        // color='primary'
                        className='dashboard__middel__top-matches__title'
                        size='medium'
                        variant='outlined'
                        style={{ backgroundColor: '#424242', color: '#fff' }}

                    />

                    <div className='dashboard__middel__top-matches__cards'>
                        <Cards title='title' />
                        <Cards title='title' />
                    </div>
                </section>

                <section className='dashboard__middel__corossol'>
                    <ImageSlider data={usersData} comp='dashboard' title='...Happy Sliding' />
                </section>
            </Grid>

            <Grid item xs={3} sm={3} className='dashboard__right'>
                <DashboardRight />
            </Grid>
        </Grid>
    )
}

export default Dashboard