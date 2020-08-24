import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import QuantityModal from './QuantityModal';
import DeleteModal from './DeleteModal';

import './Portfolio.css';

import { convertDateToWord, formatPrice, formatPercentage } from '../Utils';

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
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
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
                {
                    this.state.currentModal === "quantity" &&
                    <QuantityModal
                        portfolio={portfolio}
                        stock={this.state.editingStock}
                        close={this.closeModal}
                    />
                }
                {
                    this.state.currentModal === "delete" &&
                    <DeleteModal
                        portfolio={portfolio}
                        stock={this.state.editingStock}
                        close={this.closeModal}
                    />
                }
                <div className="in-header">{portfolio.name} Portfolio</div>
                <table>
                    <tbody>
                        <tr className="table-header-row table-header-portfolio">
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Dividend Rate</th>
                            <th>Dividend Yield</th>
                            <th>Price Per Share</th>
                            <th>Total Price</th>
                            <th>Ex-Dividend Date</th>
                            <th></th>
                        </tr>
                        {portfolio.stocks.map((stock, k) => {
                            let price = stockData
                                ? stockData[stock.ticker].regularMarketPrice
                                : 'Loading...';
                            let totalPrice = stockData
                                ? price * stock.quantity
                                : 'Loading...';
                            let divRate = stockData
                                ? stockData[stock.ticker].dividendRate
                                : 'Loading...';
                            let divYield = stockData
                                ? stockData[stock.ticker].dividendYield
                                : 'Loading...';
                            const exDate = stockData
                                ? convertDateToWord(stockData[stock.ticker].exDividendDate)
                                : 'Loading...';
                            if (price !== 'Loading...') {
                                price = formatPrice(price, "Price not found.");
                            }
                            if (totalPrice !== 'Loading...') {
                                totalPrice = formatPrice(totalPrice, "Price not found.");
                            }
                            if (divRate !== 'Loading...') {
                                divRate = formatPrice(divRate, "N/A");
                            }
                            if (divYield !== 'Loading...') {
                                if (divYield) {
                                    divYield = formatPercentage(divYield, "N/A");
                                } else {
                                    divYield = "N/A";
                                }
                            }
                            return (
                                <tr className="table-data-row table-data-portfolio" key={k}>
                                    <td>{stock.ticker}</td>
                                    <td onClick={() => this.openQuantityModal(stock)}>
                                        <div className='table-clickable'>
                                            {stock.quantity}
                                        </div>
                                    </td>
                                    <td>{divRate}</td>
                                    <td>{divYield}</td>
                                    <td>{price}</td>
                                    <td>{totalPrice}</td>
                                    <td>{exDate}</td>
                                    <td>
                                        <button
                                            onClick={() => this.openDeleteModal(stock)}
                                            className="table-button portfolio-delete"
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
        );
    }
}

export default Portfolio;
