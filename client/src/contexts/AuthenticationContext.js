import React, { Component, createContext } from 'react';

import { postData } from '../utils.js';


export const AuthenticationContext = createContext();

class AuthenticationContextProvider extends Component {
    state = {
        user: null,
    }

    register = async (registrationInfo) => {
        const { name, email, password } = registrationInfo;
        const res = await postData('/api/register', { name, email, password });
        if (res.success) {
            this.setState({ user: res });
        }
        else {
            return res.msg;
        }
    }

    login = async (userInfo) => {
        const { email, password } = userInfo;
        const res = await postData('/api/login', { email, password });
        if (res.success) {
            this.setState({ user: res });
        } else {
            return res.msg;
        }
    }

    addPortfolio = async (name) => {
        const { user } = this.state;
        if (user.portfolios.some(portfolio => portfolio.name === name)) {
            return `You already have a portfolio with the name: ${name}.`;
        }
        const res = await postData('/api/portfolio/add', { name, user_id: user.id });
        if (res.success) {
            const { portfolio } = res;
            user.portfolios.push(portfolio);
            this.setState({ user });
        } else {
            return res.msg;
        }
    }

    render() {
        console.log(this.state);
        return (
            <AuthenticationContext.Provider
                value={{
                    ...this.state,
                    register: this.register,
                    login: this.login,
                    addPortfolio: this.addPortfolio,
                 }}
            >
                {this.props.children}
            </AuthenticationContext.Provider>
        )
    }
}

export default AuthenticationContextProvider;
