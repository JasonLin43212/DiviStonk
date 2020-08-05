const express = require("express");
const router = express.Router();
const lodash = require('lodash');
const yahooFinance = require('yahoo-finance');

const User = require('../models/User.js');

router.post("/", (req, res) => {
    yahooFinance.quote({
        symbols: req.body.tickers,
    }, function (err, quotes) {
        if (err) {
            return res.status(400).json({ success: false, msg: err.message });
        }
        else {
            const results = Object.keys(quotes).map(ticker => {
                const {
                    symbol,
                    longName,
                } = quotes[ticker].price;
                const {
                    dividendRate,
                    dividendYield,
                    exDividendDate,
                    fiveYearAvgDividendYield,
                } = quotes[ticker].summaryDetail;
                return {
                    symbol,
                    longName,
                    dividendRate,
                    dividendYield,
                    exDividendDate,
                    fiveYearAvgDividendYield,
                }
            });
            return res.json({ results, success: true });
        }
    });
});

module.exports = router;
