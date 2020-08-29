import React, { Component } from 'react';
import * as d3 from 'd3';

import { formatPrice, months } from '../Utils';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

const getNumDaysInMonth = (month, year) => {
    const d = new Date(year, month + 1, 0);
    return d.getDate();
}

const curDate = new Date(Date.now());
const daysThisMonth = getNumDaysInMonth(curDate.getMonth(), curDate.getFullYear());
const weeks = [];
for (let i=1; i<=daysThisMonth; i+=7) {
    const endDate = i + 6 < daysThisMonth ? i + 6 : daysThisMonth;
    weeks.push(`${curDate.getMonth() + 1}/${i} - ${curDate.getMonth() + 1}/${endDate}`);
}

class GraphView extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            timeUnit: 'year', //week, month, year
            ticker: 'All',
        }
        this.testRef = React.createRef();
    }

    getXLabels = (label) => {
        if (this.state.timeUnit === 'week' || this.state.timeUnit === 'year') {
            return label.split(" ")[0];
        }
        if (this.state.timeUnit === 'month') {
            return weeks[label];
        }
    }

    getProcessedData = () => {
        let finalData = {};
        let curDate = new Date(Date.now());

        if (this.state.timeUnit === 'week') {
            curDate.setDate(curDate.getDate() - 6);
            for (let i=0; i<7; i++) {
                const dateStr = (curDate.getMonth() + 1) + "/" + curDate.getDate() + " " + curDate.getFullYear();
                finalData[dateStr] = 0;
                curDate.setDate(curDate.getDate() + 1);
            }
            for (let dividend of this.context.user.dividends) {
                const divDate = new Date(dividend.date);
                divDate.setDate(divDate.getDate() + 1);
                const divDateStr = (divDate.getMonth() + 1) + "/" + divDate.getDate() + " " + divDate.getFullYear();
                if (finalData.hasOwnProperty(divDateStr) &&
                    (this.state.ticker === 'All' ||
                    this.state.ticker === dividend.ticker)) {
                    finalData[divDateStr] += dividend.dividend_per_stock * dividend.quantity;
                }
            }
            return finalData;
        }
        else if (this.state.timeUnit === 'month') {
            const daysThisMonth = getNumDaysInMonth(curDate.getMonth(), curDate.getFullYear());
            let numWeeks = 5;
            if (daysThisMonth < 29) {
                numWeeks = 4;
            }
            for (let i=0; i<numWeeks; i++) {
                finalData[i] = 0;
            }

            for (let dividend of this.context.user.dividends) {
                const divDate = new Date(dividend.date);
                divDate.setDate(divDate.getDate() + 1);
                if (divDate.getMonth() === curDate.getMonth() &&
                    divDate.getFullYear() === curDate.getFullYear() &&
                    (this.state.ticker === 'All' ||
                    this.state.ticker === dividend.ticker)) {
                    const divWeekNum = Math.floor((divDate.getDate()-1) / 7);
                    finalData[divWeekNum] += dividend.dividend_per_stock * dividend.quantity;
                }
            }
            return finalData;
        }
        else if (this.state.timeUnit === 'year') {
            curDate.setMonth(curDate.getMonth() - 11);
            for (let i=0; i<12; i++) {
                const dateStr = months[curDate.getMonth()] + " " + curDate.getFullYear();
                finalData[dateStr] = 0;
                curDate.setMonth(curDate.getMonth() + 1);
            }
            for (let dividend of this.context.user.dividends) {
                const divDate = new Date(dividend.date);
                divDate.setDate(divDate.getDate() + 1);
                const divDateStr = months[divDate.getMonth()] + " " + divDate.getFullYear();
                if (finalData.hasOwnProperty(divDateStr) &&
                    (this.state.ticker === 'All' ||
                    this.state.ticker === dividend.ticker)) {
                    finalData[divDateStr] += dividend.dividend_per_stock * dividend.quantity;
                }
            }
            return finalData;
        }
    }

    createChart() {
        const processedData = this.getProcessedData();
        const values = Object.values(processedData).map(val => val);

        const margin = {top: 20, right: 20, bottom: 50, left: 50};
        const width = 1150 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;


        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(Object.keys(processedData).map(date => this.getXLabels(date)))
            .padding(0.5);
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, Math.max(...values) * 1.2]);

        d3.selectAll("svg")
            .remove();

        const chart = d3.select(this.testRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        chart.append('g')
            .style("font-size", "15px")
            .call(d3.axisLeft(yScale));
        chart.append('g')
            .style("font-size", "15px")
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        chart.selectAll()
            .data(Object.keys(processedData))
            .enter()
                .append('rect')
                .attr("fill", "#666666")
                .attr('x', (date) => xScale(this.getXLabels(date)))
                .attr('y', (date) => yScale(processedData[date]))
                .attr('height', (date) => height - yScale(processedData[date]))
                .attr('width', xScale.bandwidth())

        chart.selectAll()
            .data(Object.keys(processedData))
            .enter()
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('x', (date) => xScale(this.getXLabels(date)) + (xScale.bandwidth() / 2))
                .attr('y', (date) => yScale(processedData[date]) - 5)
                .text((date) => {
                    const price = processedData[date];
                    if (price > 0) {
                        return `${formatPrice(price, 'N/A')}`;
                    }
                });
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        this.createChart();
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const uniqueTickers = new Set();
        this.context.user.dividends.forEach(dividend => {
            uniqueTickers.add(dividend.ticker);
        })
        return (
            <div style={{marginBottom: '50px'}}>
                <div className="filters">
                    <label className="input-label graph-label">Time Period:</label>
                    <select
                        className="graph-select"
                        name="timeUnit"
                        onChange={this.handleInput}
                        value={this.state.timeUnit}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                    <label className="input-label graph-label">Ticker:</label>
                    <select
                        className="graph-select"
                        name="ticker"
                        onChange={this.handleInput}
                        value={this.state.ticker}
                    >
                        <option value="All">All</option>
                        {Array.from(uniqueTickers).map(ticker => (
                            <option key={ticker} value={ticker}>
                                {ticker}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="graph-title">Dividends Earned</div>
                <div ref={this.testRef} />
            </div>
        )
    }
}

export default GraphView;
