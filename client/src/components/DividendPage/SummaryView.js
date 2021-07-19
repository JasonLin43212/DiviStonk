import React, { Component } from 'react';

import { formatPercentage, formatPrice } from '../Utils';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class SummaryView extends Component {
    static contextType = AuthenticationContext;

    getDivSummary = () => {
        const { stockData } = this.context;
        let totalStockValue = 0;
        let annualDividendIncome = 0;
        let curMonthDivEarned = 0;
        let prevMonthDivEarned = 0;
        let highDiv = {
            ticker: 'None', div: 0, portfolio: 'None', valid: false,
        }

        if (stockData) {
            const today = new Date(Date.now());
            const month = today.getMonth();
            const year = today.getFullYear();

            for (let portfolio of this.context.user.portfolios) {
                for (let stock of portfolio.stocks) {
                    if (stockData.hasOwnProperty(stock.ticker)) {
                        const stockInfo = stockData[stock.ticker];
                        if (stockInfo.hasOwnProperty("regularMarketPrice")) {
                            totalStockValue += stock.quantity * stockData[stock.ticker].regularMarketPrice;
                        }
                        if (stockInfo.hasOwnProperty("dividendRate")) {
                            const annualStockDiv = stock.quantity * stockData[stock.ticker].dividendRate
                            annualDividendIncome += annualStockDiv;

                            if (annualStockDiv > highDiv.div) {
                                highDiv = {
                                    ticker: stock.ticker,
                                    div: annualStockDiv,
                                    portfolio: portfolio.name,
                                    valid: true,
                                }
                            }
                        } else if (stock.custom_dividend_rate >= 0) {
                            const annualStockDiv = stock.quantity * stock.custom_dividend_rate;
                            annualDividendIncome += annualStockDiv;

                            if (annualStockDiv > highDiv.div) {
                                highDiv = {
                                    ticker: stock.ticker,
                                    div: annualStockDiv,
                                    portfolio: portfolio.name,
                                    valid: true,
                                }
                            }
                        }
                    }
                }
            }

            for (let dividend of this.context.user.dividends) {
                const { quantity, dividend_per_stock } = dividend;

                const divDate = new Date(dividend.date);
                divDate.setDate(divDate.getDate() + 1);

                const divMonth = divDate.getMonth();
                const divYear = divDate.getFullYear();

                if (year === divYear) {
                    if (divMonth === month) {
                        curMonthDivEarned += quantity * dividend_per_stock;
                    } else if ((month === 0 && divMonth === 11) || (divMonth === month - 1)) {
                        prevMonthDivEarned += quantity * dividend_per_stock;
                    }
                }
               
            }
        }

        const highDivString = highDiv.valid
            ? `${highDiv.ticker} from your ${highDiv.portfolio} portfolio with ${formatPrice(highDiv.div, 'N/A')} per year!`
            : 'Loading...';

        return [
            {
                title: "Estimated Annual Dividend Income",
                value: formatPrice(annualDividendIncome, "N/A"),
            },
            {
                title: "Total Dividend Yield",
                value: formatPercentage(annualDividendIncome / totalStockValue, "N/A"),
            },
            {
                title: "Dividends Earned This Month",
                value: formatPrice(curMonthDivEarned, "N/A"),
            },
            {
                title: "Dividends Earned Last Month",
                value: formatPrice(prevMonthDivEarned, "N/A"),
            },
            {
                title: "Current Highest Paying Dividend",
                value: highDivString,
            },
        ];
    }

    render() {
        const divSummary = this.getDivSummary();
        return (
            <div>
                {
                    this.context.stockData
                    ? <div>
                        {divSummary.map((summary, k) => (
                            <div key={k}>
                                <h1 className="div-summary-title">{summary.title}</h1>
                                <div className="div-summary-value">{summary.value}</div>
                            </div>
                        ))}
                    </div>
                    : <div className="div-summary-loading">
                        Loading...
                    </div>
                }

            </div>
        )
    }
}

export default SummaryView;
