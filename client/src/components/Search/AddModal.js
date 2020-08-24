import React, { Component } from 'react';
import Modal from '../Utils/Modal';
import InputField from '../Utils/InputField';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class AddModal extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            portfolio: null,
            error: '',
        }
    }

    componentDidMount() {
        const { user } = this.context;
        if (user && user.portfolios.length > 0) {
            this.setState({ portfolio: user.portfolios[0] });
        }
    }

    addStock = e => {
        e.preventDefault();
        const { portfolio, quantity } = this.state;
        const res = this.context.addStock(portfolio._id, this.props.stock.symbol, quantity);
        res.then(msg => {
            if (msg) {
                this.setState({ error: msg });
            } else {
                this.setState({ error: '' }, () => this.closeModal());
            }
        });
    }

    closeModal = () => {
        this.props.toggle(null);
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlePortfolioChange = e => {
        const foundPortfolio = this.context.user.portfolios.filter(portfolio => portfolio._id === e.target.value);
        if (foundPortfolio.length > 0) {
            this.setState({ portfolio: foundPortfolio[0] });
        }
    }

    render() {
        const { stock } = this.props;
        const { user, stockInfo } = this.context;

        const alreadyHaveStock = this.state.portfolio
            ? this.state.portfolio.stocks.some(a_stock => a_stock.ticker === stock.symbol)
            : false;
        const portfolioAddon = this.state.portfolio
            ? `to ${this.state.portfolio.name}`
            : '';
        return (
            <Modal title={`Add ${stock.symbol} Shares`} close={this.closeModal}>
                <div className="input-label" style={{fontSize: "25px"}}>Portfolio:</div>
                <div className="modal-inputs">
                    <select
                        className="input"
                        name='portfolio'
                        onChange={this.handlePortfolioChange}
                        style={{fontSize: "25px"}}
                    >
                        {this.context.user.portfolios.map((portfolio, k) => (
                            <option key={k} value={portfolio._id}>
                                {portfolio.name}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    alreadyHaveStock
                    ? <div className="modal-error">
                        You already have {stock.symbol} stock in this portfolio.
                    </div>
                    : <form onSubmit={this.addStock}>
                        <div className="modal-inputs">
                            <InputField
                                type="number"
                                name="quantity"
                                handleinput={this.handleInput}
                                value={this.state.quantity}
                                label="Quantity:"
                                fontSize="25px"
                            />
                        </div>
                        <div className="modal-error">{this.state.error}</div>

                        <button className="dark-btn portfolio-add" >
                            Add Stock {portfolioAddon}
                        </button>
                    </form>
                }

            </Modal>
        )
    }
}

export default AddModal;
