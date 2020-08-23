import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import PortfolioModal from './PortfolioModal';
import DeleteModal from './DeleteModal';


class LoggedInHome extends Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            currentModal: '',
            editingPortfolio: null,
        };
    }

    toggleAddPortfolio = () => {
        this.setState({ currentModal: "add" });
    }

    openDeleteModal = (editingPortfolio) => {
        this.setState({ editingPortfolio, currentModal: "delete" });
    }

    closeModal = () => {
        this.setState({ editingPortfolio: null,  currentModal: ""});
    }

    render() {
        const { user } = this.context;
        const stockData = this.context.stockData ? this.context.stockData : null;
        return (
            <div className="logged-in">
                {
                    this.state.currentModal === "add" &&
                     <PortfolioModal
                        close={this.closeModal}
                     />
                }
                {
                    this.state.currentModal === "delete" &&
                     <DeleteModal
                        portfolio={this.state.editingPortfolio}
                        close={this.closeModal}
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
                            <th></th>
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
                                    <td>
                                        <Link className="portfolio-link" to={`/portfolio/${portfolio._id}`}>
                                            {portfolio.name}
                                        </Link>
                                    </td>
                                    <td>{totalValue}</td>
                                    <td>
                                        <button
                                            onClick={() => this.openDeleteModal(portfolio)}
                                            className="table-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
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
