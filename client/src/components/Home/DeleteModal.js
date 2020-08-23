import React, { Component } from 'react';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import Modal from '../Utils/Modal';

class DeleteModal extends Component {
    static contextType = AuthenticationContext;

    deletePortfolio = async () => {
        this.context.deletePortfolio(this.props.portfolio._id);
        this.props.close();
    }

    render() {
        return (
            <Modal
                title={`Delete ${this.props.portfolio.name} Portfolio?`}
                close={this.props.close}
            >
                <button
                    onClick={this.deletePortfolio}
                    className="dark-btn portfolio-add"
                    style={{marginRight: '30px'}}
                >
                    Yes
                </button>
                <button
                    onClick={this.props.close}
                    className="dark-btn portfolio-add"
                >
                    No
                </button>
            </Modal>
        );
    }
}

export default DeleteModal;
