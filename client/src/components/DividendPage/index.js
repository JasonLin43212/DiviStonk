import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AddDividendModal from './AddDividendModal';
import DeleteDividendModal from './DeleteDividendModal';

import SummaryView from './SummaryView';
import TableView from './TableView';
import GraphView from './GraphView';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import './Dividend.css';

const dividendViews = {
    summary: { display: 'Summary View', component: SummaryView },
    table: { display: 'Table View', component: TableView },
    graph: { display: 'Graph View', component: GraphView },
};

class DividendPage extends Component {
    static contextType = AuthenticationContext;

    constructor(props) {
        super(props);
        this.state = {
            dividendModal: '',
            view: 'graph',
            editingDividend: null,
        };
    }

    changeView = (view) => {
        this.setState({ view });
    }

    toggleDividendAdd = () => {
        this.setState({ dividendModal: 'add' });
    }

    toggleDividendDelete = (editingDividend) => {
        this.setState({ dividendModal: 'delete', editingDividend });
    }

    closeModal = () => {
        this.setState({ dividendModal: '', editingDividend: null });
    }

    addDividend = async () => {
        const { ticker, date, quantity, dividend_per_stock } = this.state;
        const msg = await this.context.addDividend(ticker, quantity, date, dividend_per_stock);
        if (msg) {
            this.setState({ error: msg });
        }
    }

    deleteDividend = async (dividend_id) => {
        const msg = await this.context.deleteDividend(dividend_id);
        if (msg) {
            this.setState({ error: msg });
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!this.context.user) {
            return (<Redirect to='/'/>);
        }
        const DivView = dividendViews[this.state.view].component;
        return (
            <div className="logged-in">
                {
                    this.state.dividendModal === 'add'
                    && <AddDividendModal close={this.closeModal}/>
                }
                {
                    this.state.dividendModal === 'delete'
                    && <DeleteDividendModal
                        close={this.closeModal}
                        dividend={this.state.editingDividend}
                    />
                }
                <div className="in-header" style={{ display: 'flex' }}>
                    Dividends
                    <div className="dividend-add-div">
                        <button
                            className="light-btn-2 dividend-add"
                            onClick={this.toggleDividendAdd}
                        >
                            + Add Dividend
                        </button>
                    </div>
                </div>
                <div className="dividend-nav">
                    {
                        Object.keys(dividendViews).map((view, k) => (
                            <button
                                key={k}
                                className={`div-nav-btn ${this.state.view === view ? 'div-nav-active' : ''}`}
                                onClick={() => this.changeView(view)}
                            >
                                {dividendViews[view].display}
                            </button>
                        ))
                    }
                </div>
                <DivView deleteModal={this.toggleDividendDelete} close={this.closeModal}/>
            </div>
        );
    }
}

export default DividendPage;
