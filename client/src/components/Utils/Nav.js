import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

import { formatPrice, formatPercentage } from './index';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

const NAVLINKS = [
    { link: '/', name: 'Home'},
    { link: '/dividend', name: 'My Dividends'},
    { link: '/search', name: 'Search For Stocks'},
    { link: '/help', name: 'Help'},
];

class Nav extends Component {
    static contextType = AuthenticationContext;

    getSummaryDetails = () => {
        const { stockData } = this.context;
        let totalStockValue = 0;
        let totalDividendIncome = 0;
        if (stockData) {
            for (let portfolio of this.context.user.portfolios) {
                for (let stock of portfolio.stocks) {
                    if (stockData.hasOwnProperty(stock.ticker)) {
                        const stockInfo = stockData[stock.ticker];
                        if (stockInfo.hasOwnProperty("regularMarketPrice")) {
                            totalStockValue += stock.quantity * stockData[stock.ticker].regularMarketPrice;
                        }
                        if (stockInfo.hasOwnProperty("dividendRate")) {
                            totalDividendIncome += stock.quantity * stockData[stock.ticker].dividendRate;
                        } else if (stock.custom_dividend_rate >= 0) {
                            totalDividendIncome += stock.quantity * stock.custom_dividend_rate;
                        }
                    }
                }
            }
        }

        return [
            {
                title: "Total Stock Value:",
                value: formatPrice(totalStockValue, "N/A")
            },
            {
                title: "Dividend Income:",
                value: formatPrice(totalDividendIncome, "N/A")
            },
            {
                title: "Dividend Yield:",
                value: formatPercentage(totalDividendIncome / totalStockValue, "N/A")
            }
        ];
    }

    render() {
        if (!this.context.user) {
            return (<></>);
        }
        const currentPath = this.props.location.pathname;
        const summaryDetails = this.getSummaryDetails();

        return (
            <div className="navbar">
                <h1 className="navbar-title">DiviStonk</h1>
                {NAVLINKS.map((navlink,k) => (
                    <Link
                        key={k}
                        className={`navlink ${currentPath === navlink.link ? 'navlink-active' : ''}`}
                        to={navlink.link}
                    >
                        {navlink.name}
                    </Link>
                ))}
                <div className="nav-summary">
                    <h1 className="navbar-summary">Summary</h1>
                    {summaryDetails.map((detail,k) => (
                        <div key={k}>
                            <div className="nav-detail-title">{detail.title}</div>
                            {
                                this.context.stockData
                                ? <div className="nav-detail-value">{detail.value}</div>
                                : <div className="nav-detail-value">Loading...</div>
                            }
                        </div>
                    ))}
                </div>
                <div
                    className="navlink"
                    onClick={this.context.logout}
                    style={{marginBottom: "50px"}}
                >
                    Logout
                </div>
            </div>
        );
    }
}

export default Nav;
