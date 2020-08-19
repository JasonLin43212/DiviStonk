import React, { Component } from 'react';
import './InputField.css'

class InputField extends Component {
    render() {
        const { type, name, handleinput, label } = this.props;
        return (
            <div className="input-field">
                <label className="input-label">{label}</label>
                <input className="input" type={type} name={name} onChange={handleinput}/>
            </div>
        )
    }
}

export default InputField;
