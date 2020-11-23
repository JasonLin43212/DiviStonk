import React, { Component } from 'react';
import Modal from '../Utils/Modal';
import InputField from '../Utils/InputField';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class StockEditModal extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            newQuantity: this.props.stock.quantity,
            newDivRate: this.props.stock.custom_dividend_rate,
            error: '',
        };
    }

    editStock = async (e) => {
        e.preventDefault();
        const { portfolio, stock } = this.props;
        const { newQuantity, newDivRate } = this.state;
        if (newQuantity === this.props.stock.quantity &&
            newDivRate === this.props.stock.custom_dividend_rate) {
            this.setState({ error: 'You did not change anything.' });
            return;
        }
        const res = this.context.editStock(portfolio._id, stock.ticker, newQuantity, newDivRate);
        res.then(msg => {
            if (msg) {
                this.setState({ error: msg });
            } else {
                this.setState({ error: '' }, () => this.props.close());
            }
        })
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { stock } = this.props;
        return (
            <Modal
                title={`Edit ${stock.ticker} Stock`}
                close={this.props.close}
            >
                <form onSubmit={this.editStock}>
                    <div className='modal-inputs'>
                        <div className='note-text'>
                            Note: The custom dividend rate will only be used
                            when there is no real time data. -1 means that
                            no custom dividend rate is used.
                        </div>
                        <InputField
                            type="number"
                            name="newQuantity"
                            value={this.state.newQuantity}
                            handleinput={this.handleInput}
                            label="New Quantity"
                            fontSize="25px"
                            step="1"
                            min="1"
                        />
                        <InputField
                            type="number"
                            name="newDivRate"
                            value={this.state.newDivRate}
                            handleinput={this.handleInput}
                            label="Custom Dividend Rate"
                            fontSize="25px"
                            step="any"
                            min="-1"
                        />
                    </div>
                    <div className="modal-error">{this.state.error}</div>
                    <input className="dark-btn portfolio-add" type="submit" value="Edit Stock" />
                </form>
            </Modal>
        );
    }
}

export default StockEditModal;
