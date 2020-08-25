import React, { Component } from 'react';
import * as d3 from 'd3';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';


class GraphView extends Component {
    static contextType = AuthenticationContext;

    componentDidMount() {
        d3.select(this.refs.test)
            .append('h1')
            .text("wow");
    }



    render() {
        return (
            <div>
                <div ref="test">Hii</div>
            </div>
        )
    }
}

export default GraphView;
