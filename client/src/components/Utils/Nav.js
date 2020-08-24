import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

const NAVLINKS = [
    { link: '/', name: 'Home'},
    { link: '/dividend', name: 'My Dividends'},
    { link: '/search', name: 'Search For Stocks'},
    { link: '/help', name: 'Help'},
];

class Nav extends Component {
    static contextType = AuthenticationContext;

    render() {
        if (!this.context.user) {
            return (<></>);
        }
        const currentPath = this.props.location.pathname;
        return (
            <div className="navbar">
                <h1 className="navbar-title">DiviStonk</h1>
                {NAVLINKS.map((navlink,k) => (
                    <Link
                        key={k}
                        className={`navlink ${currentPath === navlink.link ? 'navlink-active' : ''}`}
                        to={navlink.link}
                    >
                        {navlink.name}
                    </Link>
                ))}
                <div className="navlink" onClick={this.context.logout}>Logout</div>
            </div>
        );
    }
}

export default Nav;
