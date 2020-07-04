import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignIn extends Component {
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
            const msg = await this.props.login(this.state);
            if (msg) {
                this.setState({ msg });
            }
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return (
            <div>
                <h1>Sign In</h1>
                {
                    this.state.msg
                    && <div className="error">
                        {this.state.msg}
                    </div>
                }
                <br/>
                <form onSubmit={this.login}>
                    <input type="email" name="email" placeholder="Enter email..." onChange={this.handleInput}/>
                    <input type="password" name="password" placeholder="Enter password..." onChange={this.handleInput}/>
                    <input type="submit" hidden/>
                </form>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}
SignIn.propTypes = {
    login: PropTypes.func,
}

export default SignIn;