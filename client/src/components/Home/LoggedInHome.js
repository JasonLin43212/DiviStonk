import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

// <span onClick={() => this.context.deletePortfolio(portfolio._id)}>
//     x
// </span>

class LoggedInHome extends Component {
    static contextType = AuthenticationContext;
    constructor(props) {
        super(props);
        this.state = {
            portfolioModal: false,
        };
    }

    openAddPortfolio = () => {
        this.setState({ portfolioModal: !this.state.portfolioModal });
    }

    render() {
        const { user } = this.context;
        console.log(user);
        return (
            <div className="logged-in">
                <div className="in-header">Good Morning, {user.name}!</div>
                <div className="table-title">
                    <div className="table-header">Portfolios</div>
                    <button
                        className="light-btn-2"
                        onClick={this.openAddPortfolio}
                    > + Add Portfolio</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Total Value</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default LoggedInHome;


// this.state = {
//     portfolio_name: '',
//     error: '',
// }

// addPortfolio = async () => {
//     const res = this.context.addPortfolio(this.state.portfolio_name);
//     res.then(msg => {
//         if (msg) {
//             this.setState({ error: msg });
//         } else {
//             this.setState({ error: '' });
//         }
//     });
// }

// <div>
//     Welcome {user.name}!
//
//     <div>
//         <div>
//             <div>{this.state.error}</div>
//             <input
//                 type="text"
//                 name="name"
//                 onChange={e => this.setState({ portfolio_name: e.target.value })}
//             />
//             <button onClick={() => this.addPortfolio()}>
//                 Add Portfolio
//             </button>
//         </div>
//
//     </div>
// </div>
