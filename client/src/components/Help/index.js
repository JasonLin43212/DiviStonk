import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class Help extends Component {
    static contextType = AuthenticationContext;
    
    render() {
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
        return (
            <div>
                I am Get started
            </div>
        );
    }
}

export default Help;
