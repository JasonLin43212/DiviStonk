import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

class Error extends Component {
    static contextType = AuthenticationContext;

    render() {
        if (this.context.user) {
            return (
                <div className="logged-in">
                    <div className="in-header">Error 404: Page Not Found</div>

                </div>
            )
        }
        return (
            <div className="logged-out">
                <Link to="/">
                    <div className="back">
                        ← Back
                    </div>
                </Link>
                <h1 className="auth-title">Error 404: Page Not Found</h1>
            </div>
        )
    }
}

export default Error;
