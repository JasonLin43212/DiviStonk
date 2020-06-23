import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div>
                Links:
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/homeauth"><li>HomeAuth</li></Link>
                    <Link to="/search"><li>Search</li></Link>
                    <Link to="/dividend"><li>Dividends</li></Link>
                    <Link to="/search"><li>Search</li></Link>
                </ul>
            </div>
        );
    }
}

export default Nav;
