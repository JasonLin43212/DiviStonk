import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

class Nav extends Component {
    render() {
        return (
            <div className="navbar">
                <Link className="navlink" to="/">Home</Link>
                <Link className="navlink" to="/get_started">Get Started</Link>
                <Link className="navlink" to="/sign_in">Sign In</Link>
                <span>or</span>
                <Link className="navlink" to="/register">Register</Link>
            </div>
        );
    }
}

export default Nav;
