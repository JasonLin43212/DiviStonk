import React, { Component } from 'react';
import { postData } from '../../utils.js';

import SearchStock from './SearchStock';

import './Search.css';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Search extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            info: null,
            error: '',
        }
    }

    componentDidMount() {
        if (this.context.user && this.context.user.portfolios.length > 0) {
            this.setState({ portfolio_id: this.context.user.portfolios[0]._id });
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    getStockInfo = async (e) => {
        e.preventDefault();
        const body = { tickers: [this.state.ticker]};
        const res = await postData('/api/dividend', body);
        this.setState({ info: res });
    };

    addStock = async (ticker) => {
        const { portfolio_id, quantity } = this.state;
        const res = await this.context.addStock(portfolio_id, ticker, parseInt(quantity));
        if (res) {
            this.setState({ error: res });
        }
    }

    render() {
        let stockResults = this.state.info
            ? this.state.info.results.map(stock => (
                <SearchStock key={1} stock={stock}/>
            ))
            : '';
        return (
            <div className="logged-in">
                <div className="in-header">
                    Search for Stocks
                </div>
                <form className="search-form" onSubmit={this.getStockInfo}>
                    <label className="search-label">Stock Ticker:</label>
                    <input
                        className="search-input"
                        type="text"
                        name="ticker"
                        onChange={this.handleInput}
                    />
                    <input type="submit" className="dark-btn search-btn" value="Search"/>
                </form>
                {stockResults}
            </div>
        );
    }
}

export default Search;
