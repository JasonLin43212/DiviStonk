import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoggedInHome from './LoggedInHome';
import LoggedOutHome from './LoggedOutHome';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Home extends Component {
    static contextType = AuthenticationContext;

    render() {
        const { user } = this.context;
        return user ? <LoggedInHome/> : <LoggedOutHome/>;
    }
}

export default Home;
