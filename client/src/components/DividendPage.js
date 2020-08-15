import React, { Component } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

class DividendPage extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            info: null,
        }
    }

    render() {
        return (
            <div>
                Dividend
            </div>
        );
    }
}

export default DividendPage;
