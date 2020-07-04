import React, { Component } from 'react';

class DividendPage extends Component {
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
