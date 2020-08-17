import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

import { AuthenticationContext } from '../contexts/AuthenticationContext';

class Nav extends Component {
    static contextType = AuthenticationContext;

    render() {
        return (
            <div className="navbar">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/get_started">Get Started</Link>
                {
                    this.context.user ?
                    <>
                        <Link className="navlink" to="/search">Search</Link>
                        <Link className="navlink" to="/dividend">Dividends</Link>
                        <div onClick={this.context.logout}>Logout</div>
                    </>
                    :
                    <>
                        <Link className="navlink" to="/sign_in">Sign In</Link>
                        <span>or</span>
                        <Link className="navlink" to="/register">Register</Link>
                    </>
                }
            </div>
        );
    }
}

export default Nav;
