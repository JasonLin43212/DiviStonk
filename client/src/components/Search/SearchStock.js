import React, { Component } from 'react';
import { convertDateToWord, formatPrice, formatPercentage } from '../Utils';

class SearchStock extends Component {
    render() {
        const { stock } = this.props;
        const fiveAvg = stock.fiveYearAvgDividendYield
            ? stock.fiveYearAvgDividendYield
            : 'N/A';
        return (
            <div className="stock-result">
                <div className="stock-title">
                    {stock.longName} ({stock.symbol})
                </div>
                <div className="stock-info">
                    ‣ Dividend Rate: {formatPrice(stock.dividendRate, 'N/A')}
                </div>
                <div className="stock-info">
                    ‣ Dividend Yield: {formatPercentage(stock.dividendYield, 'N/A')}
                </div>
                <div className="stock-info">
                    ‣ Ex-Dividend Date: {convertDateToWord(stock.exDividendDate)}
                </div>
                <div className="stock-info">
                    ‣ Five Year Average Dividend Yield: {fiveAvg}%
                </div>
                <button onClick={() => this.props.toggleAddModal(stock)} className="stock-btn dark-btn">
                    Add Stock
                </button>
            </div>
        )
    }
}

export default SearchStock;
