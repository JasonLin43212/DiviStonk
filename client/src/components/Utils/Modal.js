import React, { Component } from 'react';

import './Modal.css';

class Modal extends Component {
    componentDidMount() {
        document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflowY = 'auto';
    }

    render() {
        return (
            <div className="darken">
                <div className="modal" style={this.props.modalstyles}>
                    <div className="modal-header">
                        <div className="modal-title">{this.props.title}</div>
                        <div className="close-div">
                            <span
                                onClick={this.props.close}
                                className="close"
                            >
                                &times;
                            </span>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
