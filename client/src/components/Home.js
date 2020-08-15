import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../contexts/AuthenticationContext';

class Home extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            portfolio_name: '',
            error: '',
        }
    }

    addPortfolio = async () => {
        const res = this.context.addPortfolio(this.state.portfolio_name);
        res.then(msg => {
            if (msg) {
                this.setState({ error: msg });
            } else {
                this.setState({ error: '' });
            }
        });
    }

    render() {
        const { user } = this.context;
        if (user) {
            return (
                <div>
                    Welcome {user.name}!

                    <div>
                        <div>
                            <div>{this.state.error}</div>
                            <input
                                type="text"
                                name="name"
                                onChange={e => this.setState({ portfolio_name: e.target.value })}
                            />
                            <button onClick={() => this.addPortfolio()}>
                                Add Portfolio
                            </button>
                        </div>
                        {
                            user.portfolios.length === 0
                            ?
                            <div>
                                You do not have any portfolios. Please add a portfolio.
                            </div>
                            :
                            <div>
                                {user.portfolios.map((portfolio, k)  => (
                                    <div key={k}>
                                        <div>
                                            {portfolio.name}
                                        </div>
                                        <ul>
                                        {portfolio.stocks.map((stock, j) => (
                                            <li key={j}>
                                                {stock.ticker}
                                                {stock.quantity}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h1>Dividends Are Your Friends</h1>
                    <div>
                        Plan for your future by investing in stocks that pay you
                        while you are sleeping!
                    </div>
                    <button>
                        <Link to='/get_started'>
                            Start Now!
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}

export default Home;
