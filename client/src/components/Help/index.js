import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import './Help.css';

class Help extends Component {
    static contextType = AuthenticationContext;

    render() {
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
        return (
            <div className="logged-in">
                <div className="in-header">Help</div>
                <h1 className="help-header">What Are Dividends?</h1>
                <div className="help-text">
                    According to <a href="https://www.investopedia.com/terms/d/dividend.asp" target="_blank" rel="noopener noreferrer">Investopedia</a>, a <b>dividend</b> is
                    a distribution of some company's earning to a class of its shareholders. In other words, it is money that some company pays you
                    if you own shares in that company. However, not all companies pay dividends.
                </div>

                <h1 className="help-header">When Do I Get Dividends?</h1>
                <div className="help-text">
                    The frequency at which dividends are paid out to shareholders vary from company to company.
                    Typically, companies pay every three months, but there are some companies that pay every month.
                    Companies will post <u>ex-dividend dates</u>, <u>record dates</u>, and <u>pay dates</u>. One place
                    where you can find these dates is on <a href="https://www.nasdaq.com/market-activity/quotes/dividend-history" target="_blank" rel="noopener noreferrer">Nasdaq's Dividend History Page</a>. In
                    order for you to be paid dividends, you need to buy shares of a company before the ex-dividend date. If you buy the share on the ex-dividend date or
                    after, you will not recieve the dividend payment until the next time they pay out dividends. The pay dates are typically one month
                    after the record dates and the record dates after the ex-dividend dates excluding weekends.
                </div>

                <h1 className="help-header">Are Dividends Safe?</h1>
                <div className="help-text">
                    Most dividend stocks are safe. Even when a company's stock value goes down, they should still be consistent in their dividend payments (unless something
                    huge like COVID-19 happens, but even then, most companies kept their dividend payments during the pandemic).
                    If you split your portfolio between a diverse range of companies, it is almost guaranteed that you will be paid dividends no matter what the situation is.
                </div>

                <h1 className="help-header">How Do I Use This Website?</h1>
                <div className="help-text">
                    First, create a portfolio on the Home page to keep track of an actual portfolio that you have money invested in.
                    Then, you can go to the Search For Stocks page to find and add the stocks that you have bought. You can see what stocks your portfolio has
                    by clicking on it in the Home page. In the Portfolio page, you can change the quantity of stocks for a company if you buy or sell shares.
                    You can also keep track of the dividends that you earn over time.
                </div>
            </div>
        );
    }
}

export default Help;
