import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthenticationContext } from '../contexts/AuthenticationContext';

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
        return (
            <div>
                <h1>Register</h1>
                {
                    this.state.msg
                    && <div className="error">
                        {this.state.msg}
                    </div>
                }
                <br/>
                <form onSubmit={this.register}>
                    <input type="text" name="name" placeholder="Enter name..." onChange={this.handleInput}/>
                    <input type="email" name="email" placeholder="Enter email..." onChange={this.handleInput}/>
                    <input type="password" name="password" placeholder="Enter password..." onChange={this.handleInput}/>
                    <input type="password" name="confirmPassword" placeholder="Confirm password..." onChange={this.handleInput}/>
                    <input type="submit" hidden/>
                </form>
                <button onClick={this.register}>Register</button>
            </div>
        );
    }
}

export default Register;
