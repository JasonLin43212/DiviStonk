import React, { Component } from 'react';
import './InputField.css'

class InputField extends Component {
    render() {
        const { type, name, handleinput, label, fontSize, value, step, min } = this.props;
        return (
            <div className="input-field">
                <label style={{ fontSize }} className="input-label">{label}</label>
                <input
                    style={{ fontSize }}
                    className="input"
                    value={value}
                    min={min}
                    type={type}
                    name={name}
                    onChange={handleinput}
                    step={step}
                />
            </div>
        )
    }
}

export default InputField;
