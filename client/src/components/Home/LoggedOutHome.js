import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import './Home.css';

class LoggedOutHome extends Component {
    static contextType = AuthenticationContext;

    render() {
        return (
            <div className="logged-out">
                <h1 className="title">DiviStonk</h1>
                <div className="sub-title">
                    Dividends are your friends!
                </div>
                <div className="logged-out-button-div">
                    <Link to='/sign_in'>
                        <button className="light-btn logged-out-buttons">
                            Sign In
                        </button>
                    </Link>
                    or
                    <Link to='/register'>
                        <button className='light-btn logged-out-buttons'>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default LoggedOutHome;
