import React, { Component } from 'react';
import { postData } from '../utils';

import { AuthenticationContext } from '../contexts/AuthenticationContext';

class Search extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            info: null,
            portfolio: this.context ? this.context.user.portfolios[0] : '',
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

    addStock = () => {
        this.context.addStock();//
    }

    render() {
        return (
            <div>
                <input type='text' name='ticker' onChange={this.handleInput}/>
                <button onClick={this.getStockInfo}>
                    Get Stock Info
                </button>
                {
                    this.state.info &&
                    <div>
                        {this.state.info.results.map(stockInfo => (
                            <div>
                                <h2>{stockInfo.longName} ({stockInfo.symbol})</h2>
                                <div>Dividend Rate: ${stockInfo.dividendRate}</div>
                                <div>Dividend Yield: {stockInfo.dividendYield}</div>
                                <div>Ex-Dividend Date: {stockInfo.exDividendDate}</div>
                                <div>Five Year Average Dividend Yield: {stockInfo.fiveYearAvgDividendYield}</div>
                            </div>
                        ))}
                        {
                            this.context.user &&
                            <div>
                                Add Stock to Portfolio
                                <select name='portfolio' onChange={this.handleInput}>
                                    {this.context.user.portfolios.map((portfolio, k) => (
                                        <option key={k}>
                                            {portfolio.name}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={this.addStock}>
                                    Add Stock To Portfolio
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Search;
