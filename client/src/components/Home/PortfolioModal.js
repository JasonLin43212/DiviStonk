import React, { Component } from 'react';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import Modal from '../Utils/Modal';
import InputField from '../Utils/InputField';

class PortfolioModal extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            portfolio_name: '',
            error: '',
        };
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addPortfolio = async (e) => {
        e.preventDefault();
        const res = this.context.addPortfolio(this.state.portfolio_name);
        res.then(msg => {
            if (msg) {
                this.setState({ error: msg });
            } else {
                this.setState({ error: '' }, () => this.props.close());
            }
        });
    }

    render() {
        return (
            <Modal title="Add Portfolio" close={this.props.close}>
                <form onSubmit={this.addPortfolio}>
                    <div className="modal-inputs">
                        <InputField
                            type="text"
                            name="portfolio_name"
                            handleinput={this.handleInput}
                            label="New Portfolio Name:"
                            fontSize="20px"
                        />
                    </div>
                    <div className="modal-error">{this.state.error}</div>
                    <input className="dark-btn portfolio-add" type="submit" value="Add Portfolio" />
                </form>
            </Modal>
        );
    }
}

export default PortfolioModal;
