import React, { Component } from 'react';
import Home from './components/Home';
import Nav from './components/Utils/Nav';
import Search from './components/Search';
import DividendPage from './components/DividendPage';
import SignIn from './components/Authentication/SignIn';
import Register from './components/Authentication/Register';
import GetStarted from './components/GetStarted';
import Error from './components/Utils/Error';
import { Switch, Route } from 'react-router-dom';

import AuthenticationContextProvider, { AuthenticationContext } from './contexts/AuthenticationContext';

import './App.css';

class App extends Component {
    render() {
        return (
            <AuthenticationContextProvider>
                <Switch>
                    <Nav/>
                </Switch>
                <Switch>
                    <Route exact path='/'>
                        <Home/>
                    </Route>
                    <Route path='/sign_in'>
                        <SignIn/>
                    </Route>
                    <Route path='/register'>
                        <Register/>
                    </Route>
                    <Route path='/dividend'>
                        <DividendPage/>
                    </Route>
                    <Route path='/search'>
                        <Search/>
                    </Route>
                    <Route path='/get_started' component={GetStarted}/>
                    <Route path='/' component={Error}/>
                </Switch>
            </AuthenticationContextProvider>
        );
    }
}

export default App;
