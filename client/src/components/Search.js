import React, { Component } from 'react';
import { postData } from '../utils';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            info: null,
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getStockInfo = async () => {
        const body = { tickers: [this.state.ticker]};
        const res = await postData('/api/dividend', body);
        this.setState({ info: res });
    };

    render() {
        return (
            <div>
                <input type='text' name='ticker' onChange={this.handleInput}/>
                <button onClick={this.getStockInfo}>
                    Get Stock Info
                </button>
            </div>
        );
    }
}

export default Search;
