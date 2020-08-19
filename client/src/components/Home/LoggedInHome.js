import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

// <span onClick={() => this.context.deletePortfolio(portfolio._id)}>
//     x
// </span>

class LoggedInHome extends Component {
    static contextType = AuthenticationContext;

    render() {
        const { user } = this.context;
        return (
            <div className="logged-in">
                <div className="in-header">Good Morning, {user.name}!</div>
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
