import React, { Component } from 'react';
import Home from './components/Home.js';
import Auth from './components/Auth.js';
import HomeAuthed from './components/HomeAuthed.js';
import Nav from './components/Nav.js';
import Search from './components/Search.js';
import DividendPage from './components/DividendPage.js';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/dividend' component={DividendPage}/>
                    <Route path='/search' component={Search}/>
                    <Route path='/homeauth' component={HomeAuthed}/>
                </Switch>
            </div>
        );
    }
}

export default App;
