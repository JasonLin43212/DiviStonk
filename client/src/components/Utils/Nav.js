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

    constructor(props) {
        super(props);
        this.state = {
            openNav: false,
        }
    }

    toggleNav = (openNav) => {
        this.setState({ openNav });
    }

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

        const navContent = (
            <>
                <h1 className="navbar-title">
                    DiviStonk
                    <div
                        onClick={() => this.toggleNav(false)}
                        className="d-inline d-none-xl navbar-close"
                    >
                        &#60;
                    </div>
                </h1>

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
            </>);

        return (
            <>
                <div className="navbar d-block-xl d-none">
                    {navContent}
                </div>
                {
                    this.state.openNav ?
                        (<div className="navbar d-none-xl d-block">
                            {navContent}
                        </div>) :
                        (<div className="hamnav d-none-xl d-block">
                            <div className="hamburger" onClick={() => this.toggleNav(true)}>
                                <div className="rectangle"/>
                                <div className="rectangle"/>
                                <div className="rectangle"/>
                            </div>
                        </div>)
                }
            </>
        )
    }
}

export default Nav;
