import React, { Component } from 'react';
import './InputField.css'

class InputField extends Component {
    render() {
        const { type, name, handleinput, label, fontSize, value } = this.props;
        return (
            <div className="input-field">
                <label style={{ fontSize }} className="input-label">{label}</label>
                <input
                    style={{ fontSize }}
                    className="input"
                    value={value}
                    min="1"
                    type={type}
                    name={name}
                    onChange={handleinput}
                />
            </div>
        )
    }
}

export default InputField;
