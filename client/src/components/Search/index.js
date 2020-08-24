import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { postData } from '../../utils.js';

import SearchStock from './SearchStock';
import AddModal from './AddModal';

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
            addModal: false,
            addingStock: null,
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
        if (res.success) {
            this.setState({ info: res, error: '' });
        } else {
            this.setState({ error: res.msg });
        }
    };

    addStock = async (ticker) => {
        const { portfolio_id, quantity } = this.state;
        const res = await this.context.addStock(portfolio_id, ticker, parseInt(quantity));
        if (res) {
            this.setState({ error: res });
        }
    }

    highDiv = async () => {
        const body = { tickers: [
            'UVV', 'BNS', 'CM', 'IP', 'BCE', 'STX', 'BMO', 'CMP', 'IBM',
            'TRP', 'TD', 'BOH', 'SO', 'RY', 'EIX', 'DUK', 'VZ', 'ALE',
            'SLF', 'SR', 'ED', 'CFR', 'MMM', 'BKH', 'ETR', 'O', 'MET',
            'SJI', 'ABBV', 'FRT', 'MO',
        ]};
        const res = await postData('/api/dividend', body);
        if (res.success) {
            this.setState({ info: res, error: '' });
        } else {
            this.setState({ error: res.msg });
        }
    }

    toggleAddModal = (addingStock) => {
        this.setState({ addModal: !this.state.addModal, addingStock });
    }

    render() {
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
        let stockResults = this.state.info
            ? this.state.info.results.map((stock, k) => (
                <SearchStock key={k} stock={stock} toggleAddModal={this.toggleAddModal}/>
            ))
            : '';
        return (
            <div className="logged-in">
                {
                    this.state.addModal &&
                    <AddModal stock={this.state.addingStock} toggle={this.toggleAddModal}/>
                }
                <div className="in-header">
                    Search for Stocks
                </div>
                <button className="built-in-stock" onClick={this.highDiv}>
                    High Dividend Stocks
                </button>
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
                {
                    this.state.error &&
                    <div className="search-error">
                        {this.state.error}
                    </div>
                }
                {stockResults}
            </div>
        );
    }
}

export default Search;
