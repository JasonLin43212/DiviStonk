import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import InputField from '../Utils/InputField';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Register extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            msg: '',
        }
    }

    register = async e => {
        e.preventDefault(); // Prevents page from refreshing
        const { name, email, password, confirmPassword } = this.state;
        if (!name || !email || !password || !confirmPassword) {
            this.setState({ msg: 'Please fill in all fields!' });
        } else if (password !== confirmPassword) {
            this.setState({ msg: 'Your passwords do not match.' })
        } else {
            const msg = await this.context.register(this.state);
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
            {type: "text", name: "name", label: "Name:"},
            {type: "email", name: "email", label: "Email:"},
            {type: "password", name: "password", label: "Password:"},
            {type: "password", name: "confirmPassword", label: "Confirm Password:"},
        ];

        return (
            <div className="logged-out">
                <Link to="/">
                    <div className="back">
                        ← Back
                    </div>
                </Link>
                <h1 className="auth-title">Register</h1>
                {
                    this.state.msg
                    && <div className="auth-error">
                        {this.state.msg}
                    </div>
                }
                <br/>
                <form className="auth-form" onSubmit={this.register}>
                    {inputFields.map((field, k) => (
                        <InputField
                            key={k}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            handleinput={this.handleInput}
                            fontSize="20px"
                        />
                    ))}
                    <input
                        className="light-btn logged-out-buttons auth-submit"
                        type="submit"
                        value="Register"
                    />
                </form>
            </div>
        );
    }
}

export default Register;
