import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
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
