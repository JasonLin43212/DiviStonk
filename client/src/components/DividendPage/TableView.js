import React, { Component } from 'react';

import { convertDateToWord, formatPrice } from '../Utils';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class TableView extends Component {
    static contextType = AuthenticationContext;

    render() {
        const { user } = this.context;
        const user_dividends = [...user.dividends];

        user_dividends.sort((a, b) => {
            const a_date = new Date(a.date);
            const b_date = new Date(b.date);
            if (a_date.getTime() === b_date.getTime()) {
                return b.id - a.id;
            }
            return b_date - a_date;
        });
        return (
            <div className="div-table">
                <table className="dividend-table">
                    <tbody>
                        <tr className="table-header-row table-header-portfolio">
                            <th>Date</th>
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Amount Per Share</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                        {user_dividends.map((dividend, k) => {
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
