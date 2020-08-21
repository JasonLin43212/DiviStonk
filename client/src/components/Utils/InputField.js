import React, { Component } from 'react';
import './InputField.css'

class InputField extends Component {
    render() {
        const { type, name, handleinput, label, fontSize } = this.props;
        return (
            <div className="input-field">
                <label style={{ fontSize }} className="input-label">{label}</label>
                <input style={{ fontSize }} className="input" type={type} name={name} onChange={handleinput}/>
            </div>
        )
    }
}

export default InputField;
