import React, { Component } from 'react';

import Modal from '../Utils/Modal';
import InputField from '../Utils/InputField';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class AddDividendModal extends Component{
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            date: '',
            quantity: 1,
            dividend_per_stock: 0,
            error: '',
        };
    }

    addDividend = async (e) => {
        e.preventDefault();
        const { ticker, date, quantity, dividend_per_stock } = this.state;
        const msg = await this.context.addDividend(ticker, quantity, date, dividend_per_stock);
        if (msg) {
            this.setState({ error: msg });
        } else {
            this.setState({ error: '' });
            this.props.close();
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Modal title='Add Dividends' modalstyles={{ top: '10%' }} close={this.props.close}>
                <form onSubmit={this.addDividend}>
                    <div className="modal-inputs">
                        <label style={{ fontSize: "18px" }} className="input-label">
                            Stock Ticker:
                        </label>
                        <select className="ticker-select" name="ticker" onChange={this.handleInput}>
                            <option value='' selected='selected' disabled>Select a stock ticker</option>
                            {Array.from(this.context.getAllStockTickers()).map(stock => (
                                <option key={stock.ticker} value={stock.ticker}>
                                    {stock.ticker}
                                </option>
                            ))}
                        </select>
                        <InputField
                            type="number"
                            name="quantity"
                            handleinput={this.handleInput}
                            label="Number of Shares:"
                            fontSize="18px"
                            value={this.state.quantity}
                            step="1"
                            min="1"
                        />
                        <InputField
                            type="date"
                            name="date"
                            handleinput={this.handleInput}
                            label="Date Recieved:"
                            fontSize="18px"
                        />
                        <InputField
                            type="number"
                            name="dividend_per_stock"
                            handleinput={this.handleInput}
                            label="Amount Per Share:"
                            fontSize="18px"
                            step="any"
                            min="0"
                        />
                        <div className="modal-error">{ this.state.error }</div>
                        <input className="dark-btn portfolio-add" type="submit" value="Add Dividend" />
                    </div>
                </form>
            </Modal>
        )
    }
}

export default AddDividendModal;
