import React, { useContext } from 'react';
import './App.scss';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import userPage from './pages/User'
import Navigation from './components/navigation/navigation'
import { UserContext } from './context/UserContextProvider'
import Dashboard from './pages/Dashboard'
import MyProfile from './pages/MyProfile'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error'



export default function App() {

  const context = useContext(UserContext);


  const errorLink = onError(({graphqlErrors,networkError})=>{
    if (graphqlErrors) {
      graphqlErrors.map(({message,location,path})=>{
        alert(`graphql error ${message}`)
      })
    }
  })
  const link = from([
    errorLink,
    new HttpLink({uri:"http://localhost:5000/graphql"})
  ])
  const client = new ApolloClient({
    cache:new InMemoryCache(),
    link:link
  })


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <main className='main'>
            <Switch>

              {context.email && <Redirect from='/' to='/profile' exact />}
              {context.email && <Redirect from='/users' to='/profile' exact />}

              {!context.email && <Route path='/users' component={userPage} />}
              {!context.email && <Redirect to='/users' exact />}
              <Route path='/profile' component={MyProfile} />

              <Route path='/dashboard' component={Dashboard} />

              {/* {context.token && <Route path='/profile' component={Profile} />} */}
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}



