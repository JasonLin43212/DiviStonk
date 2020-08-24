import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class DividendPage extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            date: '',
            quantity: 0,
            dividend_per_stock: 0,
            error: '',
        };
    }

    addDividend = async () => {
        const { ticker, date, quantity, dividend_per_stock } = this.state;
        const msg = await this.context.addDividend(ticker, quantity, date, dividend_per_stock);
        if (msg) {
            this.setState({ error: msg });
        }
    }

    deleteDividend = async (dividend_id) => {
        const msg = await this.context.deleteDividend(dividend_id);
        if (msg) {
            this.setState({ error: msg });
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
        return (
            <div>
                <h1>Here are you dividends!</h1>
                <div>{ this.state.error }</div>
                Add Dividends!<br/>
                Ticker: <input type="text" name="ticker" onChange={this.handleInput}/>
                Quantity: <input type="number" name="quantity" onChange={this.handleInput}/>
                Date: <input type="date" name="date" onChange={this.handleInput}/>
                Dividend Earned Per Stock: <input type="number" name="dividend_per_stock" onChange={this.handleInput}/>
                <button onClick={() => this.addDividend()}>
                    Add Dividend
                </button>
                {
                    this.context.user &&
                    this.context.user.dividends.map(dividend => (
                        <div key={dividend.id}>
                            {dividend.ticker}
                            {dividend.quantity}
                            {dividend.dividend_per_stock}
                            &nbsp;
                            <span onClick={() => this.deleteDividend(dividend.id)}>
                                x
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default DividendPage;
