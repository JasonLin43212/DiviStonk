import React, { Component } from 'react';
import Home from './components/Home.js';
import Nav from './components/Nav.js';
import Search from './components/Search.js';
import DividendPage from './components/DividendPage.js';
import SignIn from './components/SignIn.js';
import Register from './components/Register.js';
import GetStarted from './components/GetStarted.js';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/sign_in' component={SignIn}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/dividend' component={DividendPage}/>
                    <Route path='/search' component={Search}/>
                    <Route path='/get_started' component={GetStarted}/>
                </Switch>
            </div>
        );
    }
}

export default App;
