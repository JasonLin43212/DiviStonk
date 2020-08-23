import React, { Component } from 'react';

class SearchStock extends Component {
    render() {
        const { stock } = this.props;
        return (
            <div className="stock-result">
                <div className="stock-title">
                    {stock.longName} ({stock.symbol})
                </div>
                <div className="stock-info">
                    ‣ Dividend Rate: ${stock.dividendRate}
                </div>
                <div className="stock-info">
                    ‣ Dividend Yield: {stock.dividendYield}
                </div>
                <div className="stock-info">
                    ‣ Ex-Dividend Date: {stock.exDividendDate}
                </div>
                <div className="stock-info">
                    ‣ Five Year Average Dividend Yield: {stock.fiveYearAvgDividendYield}
                </div>
                <button className="stock-btn dark-btn">
                    Add Stock
                </button>
            </div>
        )
    }
}

export default SearchStock;

/*
// <div>
//     Add Stock to Portfolio
//     <select name='portfolio_id' onChange={this.handleInput}>
//         {this.context.user.portfolios.map((portfolio, k) => (
//             <option key={k} value={portfolio._id}>
//                 {portfolio.name}
//             </option>
//         ))}
//     </select>
//     <div>
//         Quantity:
//         <input
//             type="number"
//             name="quantity"
//             onChange={this.handleInput}
//             min="1"
//             value={this.state.quantity}
//         />
//         <button onClick={() => this.addStock(stockInfo.symbol)}>
//             Add Stock To Portfolio
//         </button>
//         <div>{this.state.error}</div>
//     </div>
// </div>
*/
