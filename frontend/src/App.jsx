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
import PayPal from './components/profile/PayPal';
import Survay from './components/profile/survay/Survay';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faFemale } from '@fortawesome/free-solid-svg-icons'

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
              {context.email && <Redirect from='/users' to='/profile' exact />}

              {!context.email && <Route path='/users' component={userPage} />}
              {!context.email && <Redirect to='/users' exact />}
              <Route path='/profile' component={MyProfile} />

              <Route path='/dashboard' component={Dashboard} />
              <Route path='/paypal' component={PayPal} />
              <Route path='/survay' component={Survay} />

              {/* {context.token && <Route path='/profile' component={Profile} />} */}
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  );
}



