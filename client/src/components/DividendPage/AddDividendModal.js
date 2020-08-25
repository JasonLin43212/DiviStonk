import React, { Component } from 'react';

import Modal from '../Utils/Modal';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class AddDividendModal extends Component{
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            date: '',
            quantity: 0,
            dividend_per_stock: 0,
            error: '',
        };
    }

    render() {
        return (
            <Modal title='Add Dividends'>
                <div>{ this.state.error }</div>
                Add Dividends!<br/>
                Ticker: <input type="text" name="ticker" onChange={this.handleInput}/>
                Quantity: <input type="number" name="quantity" onChange={this.handleInput}/>
                Date: <input type="date" name="date" onChange={this.handleInput}/>
                Dividend Earned Per Stock: <input type="number" name="dividend_per_stock" onChange={this.handleInput}/>
                <button onClick={() => this.addDividend()}>
                    Add Dividend
                </button>
                {
                    this.context.user &&
                    this.context.user.dividends.map(dividend => (
                        <div key={dividend.id}>
                            {dividend.ticker}
                            {dividend.quantity}
                            {dividend.dividend_per_stock}
                            &nbsp;
                            <span onClick={() => this.deleteDividend(dividend.id)}>
                                x
                            </span>
                        </div>
                    ))
                }
            </Modal>
        )
    }
}

export default AddDividendModal;
