import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import InputField from '../Utils/InputField';

import './Auth.css';

class SignIn extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: '',
        }
    }

    login = async e => {
        e.preventDefault(); // Prevents page from refreshing
        const {  email, password } = this.state;
        if (!email || !password) {
            this.setState({ msg: 'Please fill in all fields!' });
        } else {
            const msg = await this.context.login(this.state);
            if (msg) {
                this.setState({ msg });
            }
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        if (this.context.user) {
            return (<Redirect to="/"/>)
        }

        const inputFields = [
            {type: "email", name: "email", label: "Email:"},
            {type: "password", name: "password", label: "Password:"},
        ]

        return (
            <div className="logged-out">
                <Link to="/">
                    <div className="back">
                        ← Back
                    </div>
                </Link>
                <h1 className="auth-title">Log In</h1>
                {
                    this.state.msg
                    && <div className="auth-error">
                        {this.state.msg}
                    </div>
                }
                <br/>
                <form className="auth-form" onSubmit={this.login}>
                    {inputFields.map((field, k) => (
                        <InputField
                            key={k}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            handleinput={this.handleInput}
                        />
                    ))}
                    <input type="submit" hidden/>
                </form>
                <button className="light-btn logged-out-buttons" onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default SignIn;
