import React, { Component } from 'react';

import { convertDateToWord } from '../Utils';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Portfolio extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            currentModal: "closed",
            editingStock: null,
        };
    }

    openQuantityModal = stock => {
        this.setState({ currentModal: "quantity", editingStock: stock });
    }

    openDeleteModal = stock => {
        this.setState({ currentModal: "delete", editingStock: stock });
    }

    closeModal = () => {
        this.setState({ currentModal: "closed", editingStock: null });
    }

    render() {
        const { stockData, user } = this.context

        const notFound = (
            <div className="logged-in">
            <div className="in-header">Portfolio Not Found</div>
            </div>
        );
        if (!user) {
            return notFound;
        }

        let portfolio = user.portfolios
            .filter(portfolio => portfolio._id === this.props.match.params.id)
        if (portfolio.length === 0) {
            return notFound;
        }

        portfolio = portfolio[0];

        return (
            <div className="logged-in">
                <div className="in-header">{portfolio.name} Portfolio</div>
                <table>
                    <tbody>
                        <tr className="table-header-row">
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Price Per Share</th>
                            <th>Total Price</th>
                            <th>Ex-Dividend Date</th>
                            <th></th>
                        </tr>
                        {portfolio.stocks.map((stock, k) => {
                            const price = stockData
                                ? Math.round(stockData[stock.ticker].regularMarketPrice * 100) / 100
                                : 'Loading...';
                            const totalPrice = stockData
                                ? Math.round(price * stock.quantity * 100) / 100
                                : 'Loading...';
                            const exDate = stockData
                                ? convertDateToWord(stockData[stock.ticker].exDividendDate)
                                : 'Loading...';
                            return (
                                <tr className="table-data-row" key={k}>
                                    <td>{stock.ticker}</td>
                                    <td onClick={() => this.openQuantityModal(stock)}>{stock.quantity}</td>
                                    <td>${price}</td>
                                    <td>${totalPrice}</td>
                                    <td>{exDate}</td>
                                    <td>
                                        <button className="table-button">Delete</button>
                                    </td>
                                </tr>
                           );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Portfolio;
