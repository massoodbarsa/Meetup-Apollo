import React, { useContext } from 'react';
import './App.scss';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Navigation from './components/navigation/navigation'
import { UserContext } from './context/UserContextProvider'
import Dashboard from './pages/Dashboard'
import MyProfile from './pages/MyProfile'
import UserProfile from './pages/UserProfile';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import PayPal from './components/profile/right/PayPal';
import Survey from './components/profile/survay/Survey';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

export default function App() {

  const context = useContext(UserContext);

  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`graphql error ${message}`)
      })
    }
  })
  const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000/graphql" })
  ])
  const client = new ApolloClient({
    //This enables your client to respond to future queries for the same data without sending unnecessary network requests.
    cache: new InMemoryCache(),
    link: link
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <main className='main'>
            <Switch>
              {context.email && <Redirect from='/' to='/profile' exact />}
              {context.email && <Redirect from='/register' to='/profile' exact />}
              {!context.email && <Route path='/register' component={Register} />}
              {!context.email && <Redirect to='/register' exact />}

              <Route path='/profile' component={MyProfile} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/paypal' component={PayPal} />
              <Route path='/survey' component={Survey} />
              <Route path='/userProfile/:email'>
                <UserProfile />
              </Route>
              {/* {context.token && <Route path='/profile' component={Profile} />} */}
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}



