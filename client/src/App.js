import React, { Component } from 'react';
import Home from './components/Home.js';
import Nav from './components/Nav.js';
import Search from './components/Search.js';
import DividendPage from './components/DividendPage.js';
import SignIn from './components/SignIn.js';
import Register from './components/Register.js';
import GetStarted from './components/GetStarted.js';
import { Switch, Route } from 'react-router-dom';

import { postData } from './utils.js';
import './styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            user: null,
        }
    }

    register = async (registrationInfo) => {
        const { name, email, password } = registrationInfo;
        const res = await postData('/api/register', { name, email, password });
        if (res.success) {
            const { name, email } = res;
            this.setState({ user: { name, email } });
        }
        else {
            return res.msg;
        }
    }

    login = async (userInfo) => {
        const { email, password } = userInfo;
        const res = await postData('/api/login', { email, password });
        if (res.success) {
            const { name, email } = res;
            this.setState({ user: { name, email } });
        } else {
            return res.msg;
        }
    }

    render() {
        return (
            <div className="app">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/sign_in'>
                        <SignIn login={this.login}/>
                    </Route>
                    <Route path='/register'>
                        <Register register={this.register}/>
                    </Route>
                    <Route path='/dividend' component={DividendPage}/>
                    <Route path='/search' component={Search}/>
                    <Route path='/get_started' component={GetStarted}/>
                </Switch>
            </div>
        );
    }
}

export default App;
