import React, { Component, createContext } from 'react';

import { postData } from '../utils.js';


export const AuthenticationContext = createContext();

class AuthenticationContextProvider extends Component {
    constructor(props) {
        super(props);
        const storedUser = JSON.parse(window.localStorage.getItem('user'));
        let user = storedUser
            ? storedUser : null;
        this.state = {
            user,
            stockData: null,
        }
    }


    getStockData = async () => {
        const stockTickers = new Set();
        this.state.user.portfolios.forEach(portfolio => {
            portfolio.stocks.forEach(stock => {
                stockTickers.add(stock.ticker);
            });
        });

        const body = { tickers: Array.from(stockTickers)};
        const res = await postData('/api/dividend', body);
        const stockData = {};
        if (res.success) {
            res.results.forEach(data => {
                stockData[data.symbol] = data;
            })
            this.setState({ stockData });
        }
    }

    componentDidMount() {
        if (this.state.user) {
            this.getStockData();
        }
    }

    storeUser = (getStock) => {
        window.localStorage.setItem('user', JSON.stringify(this.state.user));
        if (getStock) {
            this.getStockData();
        }
    }

    removeUser = () => {
        window.localStorage.clear();
    }

    register = async (registrationInfo) => {
        const { name, email, password } = registrationInfo;
        const res = await postData('/api/register', { name, email, password });
        if (res.success) {
            this.setState({ user: res }, () => this.storeUser(false));
        }
        else {
            return res.msg;
        }
    }

    login = async (userInfo) => {
        const { email, password } = userInfo;
        const res = await postData('/api/login', { email, password });
        if (res.success) {
            this.setState({ user: res }, () => this.storeUser(true));
        } else {
            return res.msg;
        }
    }

    logout = () => {
        this.setState({ user: null, stockData: null }, () => this.removeUser());
    }

    addPortfolio = async (name) => {
        if (name.trim() === '') {
            return "Please enter a name for your portfolio.";
        }
        const { user } = this.state;
        if (user.portfolios.some(portfolio => portfolio.name === name)) {
            return `You already have a portfolio with the name: ${name}.`;
        }
        const res = await postData('/api/portfolio/add', { name, user_id: user.id });
        if (res.success) {
            const { portfolio } = res;
            user.portfolios.push(portfolio);
            this.setState({ user }, () => this.storeUser(true));
        } else {
            return res.msg;
        }
    }

    editPortfolio = async (new_name, portfolio_id) => {
        if (new_name.trim() === '') {
            return "Portfolio name cannot be empty.";
        }
        const { user } = this.state;
        if (user.portfolios.some(portfolio => portfolio.name === new_name)) {
            return `You already have a portfolio with the name: ${new_name}.`;
        }
        const res = await postData('/api/portfolio/edit', { new_name, portfolio_id });
        if (res.success) {
            const new_portfolio = res.portfolio;
            user.portfolios = user.portfolios.map(portfolio => portfolio._id === new_portfolio._id ? new_portfolio : portfolio);
            this.setState({ user }, () => this.storeUser(false));
        } else {
            return res.msg;
        }
    }

    deletePortfolio = async (portfolio_id) => {
        const { user } = this.state;
        const res = await postData('/api/portfolio/delete', { portfolio_id, user_id: user.id });
        if (res.success) {
            const deleted_portfolio = res.portfolio;
            user.portfolios = user.portfolios.filter(portfolio => portfolio._id !== deleted_portfolio._id);
            this.setState({ user }, () => this.storeUser(false));
        } else {
            return res.msg;
        }
    }

    addStock = async (portfolio_id, ticker, quantity) => {
        if (!ticker) {
            return "Ticker not found.";
        }
        if (!quantity || quantity <= 0) {
            return "You cannot have 0 or less stocks.";
        }
        const res = await postData('/api/portfolio/add_stock', { portfolio_id, ticker, quantity });
        if (res.success) {
            const new_portfolio = res.portfolio;
            const { user } = this.state;
            user.portfolios = user.portfolios.map(portfolio => portfolio._id === new_portfolio._id ? new_portfolio : portfolio);
            this.setState({ user }, () => this.storeUser(true));
        } else {
            return res.msg;
        }
    }

    editStock = async (portfolio_id, ticker, quantity) => {
        if (!ticker) {
            return "Ticker not found.";
        }
        if (!quantity || quantity <= 0) {
            return "You cannot have 0 or less stocks.";
        }
        const res = await postData('/api/portfolio/edit_stock', { portfolio_id, ticker, quantity });
        if (res.success) {
            const new_portfolio = res.portfolio;
            console.log(new_portfolio, "edited stock!");
            const { user } = this.state;
            user.portfolios = user.portfolios.map(portfolio => portfolio._id === new_portfolio._id ? new_portfolio : portfolio);
            this.setState({ user }, () => this.storeUser(false));
        } else {
            return res.msg;
        }
    }

    deleteStock = async (portfolio_id, ticker) => {
        if (!ticker) {
            return "Ticker not found.";
        }
        const res = await postData('/api/portfolio/delete_stock', { portfolio_id, ticker });
        if (res.success) {
            const { portfolio } = res;
            const { user } = this.state;
            user.portfolios = user.portfolios.map(a_portfolio => portfolio._id === a_portfolio._id ? portfolio : a_portfolio);
            this.setState({ user }, () => this.storeUser(false));
        } else {
            return res.msg;
        }
    }

    addDividend = async(ticker, quantity, date, dividend_per_stock) => {
        quantity = parseInt(quantity);
        dividend_per_stock = parseFloat(dividend_per_stock);
        if (!ticker) {
            return "Please input a ticker.";
        }
        if (!quantity || quantity <= 0) {
            return "Please input a valid quantity.";
        }
        if (!date) {
            return "Please input a date.";
        }
        if (!dividend_per_stock || dividend_per_stock <= 0) {
            return "Please input a valid dividend per stock value.";
        }
        const { user } = this.state;
        const res = await postData('/api/dividend/add', {
            ticker,
            quantity,
            date,
            dividend_per_stock,
            user_id: user.id,
        });
        if (res.success) {
            const { dividends } = res;
            user.dividends = dividends;
            this.setState({ user }, () => this.storeUser(true));
        } else {
            return res.msg;
        }
    }

    deleteDividend = async(dividend_id) => {
        console.log("deleteDividend context", dividend_id);
        const { user } = this.state;
        const res = await postData('/api/dividend/delete', {
            user_id: user.id,
            dividend_id,
        });

        if (res.success) {
            const { dividends } = res;
            user.dividends = dividends;
            this.setState({ user }, () => this.storeUser(false));
        } else {
            return res.msg;
        }
    }

    render() {
        return (
            <AuthenticationContext.Provider
                value={{
                    ...this.state,
                    getStockData: this.getStockData,
                    register: this.register,
                    login: this.login,
                    logout: this.logout,
                    addPortfolio: this.addPortfolio,
                    editPortfolio: this.editPortfolio,
                    deletePortfolio: this.deletePortfolio,
                    addStock: this.addStock,
                    editStock: this.editStock,
                    deleteStock: this.deleteStock,
                    addDividend: this.addDividend,
                    deleteDividend: this.deleteDividend,
                 }}
            >
                {this.props.children}
            </AuthenticationContext.Provider>
        )
    }
}

export default AuthenticationContextProvider;
