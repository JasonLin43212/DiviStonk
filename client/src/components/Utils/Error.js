import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
    render() {
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
