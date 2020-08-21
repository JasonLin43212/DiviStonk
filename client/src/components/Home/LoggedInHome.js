import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import PortfolioModal from './PortfolioModal';


class LoggedInHome extends Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            portfolioModal: false,
        };
    }

    toggleAddPortfolio = () => {
        this.setState({ portfolioModal: !this.state.portfolioModal });
    }

    render() {
        const { user } = this.context;
        const stockData = this.context.stockData ? this.context.stockData : null;
        return (
            <div className="logged-in">
                {
                    this.state.portfolioModal &&
                     <PortfolioModal
                        close={this.toggleAddPortfolio}
                     />
                }
                <div className="in-header">Good Morning, {user.name}!</div>
                <div className="table-title-div">
                    <div className="table-title">Portfolios</div>
                    <div className="table-add-div">
                        <button
                            className="light-btn-2 table-add"
                            onClick={this.toggleAddPortfolio}
                        >
                            + Add Portfolio
                        </button>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr className="table-header-row">
                            <th>Name</th>
                            <th>Total Value</th>
                        </tr>
                        {user.portfolios.map((portfolio, k) => {
                            let totalValue = "Getting Total Value...";
                            if (stockData) {
                                totalValue = portfolio.stocks.reduce((acc, stock) => {
                                    return acc + (stockData[stock.ticker].regularMarketPrice * stock.quantity);
                                }, 0);
                                totalValue = Math.round(totalValue * 100) / 100;
                                totalValue = "$" + totalValue;
                            }
                            return (
                                <tr className="table-data-row" key={k}>
                                    <td><Link to="/portfolio">{portfolio.name}</Link></td>
                                    <td>{totalValue}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default LoggedInHome;
