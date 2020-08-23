import React, { Component } from 'react';
import Modal from '../Utils/Modal';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class DeleteModal extends Component {
    static contextType = AuthenticationContext;

    deleteStock = () => {
        this.context.deleteStock(this.props.portfolio._id, this.props.stock.ticker);
        this.props.close();
    }

    render() {
        const { stock } = this.props;
        return (
            <Modal
                title={`Delete ${stock.ticker} stock?`}
                close={this.props.close}
            >
                <div className='delete-buttons-div'>
                    <button
                        onClick={this.deleteStock}
                        className='dark-btn portfolio-add'
                        style={{marginRight: '30px'}}
                    >
                        Yes
                    </button>
                    <button
                        onClick={this.props.close}
                        className='dark-btn portfolio-add'
                    >
                        No
                    </button>
                </div>
            </Modal>
        );
    }
}

export default DeleteModal;
