import React, { Component } from 'react';
import { postData } from '../../utils.js';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Search extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            info: null,
            portfolio_id: '',
            quantity: '1',
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

    getStockInfo = async () => {
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
        return (
            <div className="logged-in">
                <input type='text' name='ticker' onChange={this.handleInput}/>
                <button onClick={this.getStockInfo}>
                    Get Stock Info
                </button>
                {
                    this.state.info &&
                    <div>
                        {this.state.info.results.map(stockInfo => (
                            <div key={stockInfo.symbol}>
                                <h2>{stockInfo.longName} ({stockInfo.symbol})</h2>
                                <div>Dividend Rate: ${stockInfo.dividendRate}</div>
                                <div>Dividend Yield: {stockInfo.dividendYield}</div>
                                <div>Ex-Dividend Date: {stockInfo.exDividendDate}</div>
                                <div>Five Year Average Dividend Yield: {stockInfo.fiveYearAvgDividendYield}</div>
                                {
                                    this.context.user &&
                                    <div>
                                        Add Stock to Portfolio
                                        <select name='portfolio_id' onChange={this.handleInput}>
                                            {this.context.user.portfolios.map((portfolio, k) => (
                                                <option key={k} value={portfolio._id}>
                                                    {portfolio.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div>
                                            Quantity:
                                            <input
                                                type="number"
                                                name="quantity"
                                                onChange={this.handleInput}
                                                min="1"
                                                value={this.state.quantity}
                                            />
                                            <button onClick={() => this.addStock(stockInfo.symbol)}>
                                                Add Stock To Portfolio
                                            </button>
                                            <div>{this.state.error}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default Search;
