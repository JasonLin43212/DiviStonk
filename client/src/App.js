import React, { Component } from 'react';
import Home from './components/Home.js';
import Nav from './components/Nav.js';
import Search from './components/Search.js';
import DividendPage from './components/DividendPage.js';
import SignIn from './components/SignIn.js';
import Register from './components/Register.js';
import GetStarted from './components/GetStarted.js';
import { Switch, Route } from 'react-router-dom';

import AuthenticationContextProvider, { AuthenticationContext } from './contexts/AuthenticationContext';

import './styles/App.css';

class App extends Component {
    render() {
        return (
            <AuthenticationContextProvider>
                <div className="app">
                    <Nav/>
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
                    </Switch>
                </div>
            </AuthenticationContextProvider>
        );
    }
}

export default App;
