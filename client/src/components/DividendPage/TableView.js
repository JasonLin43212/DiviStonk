import React, { Component } from 'react';

import { convertDateToWord, formatPrice } from '../Utils';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class TableView extends Component {
    static contextType = AuthenticationContext;

    render() {
        const { user } = this.context;
        return (
            <div>
                <table>
                    <tbody>
                        <tr className="table-header-row table-header-portfolio">
                            <th>Date</th>
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Amount Per Share</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                        {user.dividends.map((dividend, k) => {
                            return (
                                <tr className="table-data-row" key={k}>
                                    <td>{convertDateToWord(dividend.date)}</td>
                                    <td>{dividend.ticker}</td>
                                    <td>{dividend.quantity}</td>
                                    <td>{formatPrice(dividend.dividend_per_stock, 'N/A')}</td>
                                    <td>{formatPrice(dividend.quantity * dividend.dividend_per_stock, 'N/A')}</td>
                                    <td>
                                        <button
                                            onClick={() => this.props.deleteModal(dividend)}
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
        )
    }
}

export default TableView;
