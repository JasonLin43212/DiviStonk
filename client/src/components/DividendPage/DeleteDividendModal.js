import React, { Component } from 'react';

import Modal from '../Utils/Modal';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class DeleteDividendModal extends Component{
    static contextType = AuthenticationContext;

    deleteDividend = async () => {
        await this.context.deleteDividend(this.props.dividend.id);
        this.props.close();
    }

    render() {
        return (
            <Modal title='Delete Dividend?' close={this.props.close}>
                <button
                    onClick={this.deleteDividend}
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
        )
    }
}

export default DeleteDividendModal;
