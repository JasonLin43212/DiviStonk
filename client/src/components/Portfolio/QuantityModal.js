import React, { Component } from 'react';
import Modal from '../Utils/Modal';
import InputField from '../Utils/InputField';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class QuantityModal extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            newQuantity: this.props.stock.quantity,
            error: '',
        };
    }

    editStock = async (e) => {
        e.preventDefault();
        console.log('hi');
        const { portfolio, stock } = this.props;
        const { newQuantity } = this.state;
        if (newQuantity === this.props.stock.quantity) {
            this.setState({ error: 'You did not change the quantity.' });
            return
        }
        const res = this.context.editStock(portfolio._id, stock.ticker, newQuantity);
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
                        <InputField
                            type="number"
                            name="newQuantity"
                            value={this.state.newQuantity}
                            handleinput={this.handleInput}
                            label="New Quantity"
                            fontSize="25px"
                        />
                    </div>
                    <div className="modal-error">{this.state.error}</div>
                    <input className="dark-btn portfolio-add" type="submit" value="Edit Stock Quantity" />
                </form>
            </Modal>
        );
    }
}

export default QuantityModal;
