import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Help extends Component {
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
