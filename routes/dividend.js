const express = require("express");
const router = express.Router();
const lodash = require('lodash');
const yahooFinance = require('yahoo-finance');

const User = require('../models/User.js');

router.post("/", (req, res) => {
    if (req.body.tickers.length === 0) {
        return res.json({ success: true, results: [] });
    }
    yahooFinance.quote({
        symbols: req.body.tickers,
    }, function (err, quotes) {
        if (err) {
            return res.json({ success: false, msg: 'The stock ticker you entered is invalid.' });
        }
        else {
            const tickers = Object.keys(quotes);
            const results = [];
            tickers.forEach(ticker => {
                const tickerKeys = Object.keys(quotes[ticker]);
                if (!tickerKeys.includes("price") || !tickerKeys.includes("summaryDetail")) {
                    return;
                }
                const {
                    symbol,
                    longName,
                    regularMarketPrice,
                } = quotes[ticker].price;
                const {
                    dividendRate,
                    dividendYield,
                    exDividendDate,
                    fiveYearAvgDividendYield,
                } = quotes[ticker].summaryDetail;
                results.push({
                    symbol,
                    longName,
                    dividendRate,
                    dividendYield,
                    exDividendDate,
                    fiveYearAvgDividendYield,
                    regularMarketPrice,
                });
            });
            if (results.length == 0) {
                return res.json({ success: false, msg: 'Not enough information found on the entered stock.' });
            }
            return res.json({ results, success: true });
        }
    });
});

router.post("/add/", (req, res) => {
    const { user_id, ticker, quantity, dividend_per_stock, date } = req.body;
    console.log(user_id, ticker, quantity, dividend_per_stock, date);
    User.findOne({ _id: user_id })
        .then(user => {
            if (!user) {
                res.json({ success: false, msg: "The user does not exist." });
            }

            const newId = user.num_dividends_created;
            user.dividends.push({
                ticker,
                quantity,
                dividend_per_stock,
                date,
                id: newId,
            });
            user.num_dividends_created += 1;
            user.save()
                .then(user => {
                    res.json({ dividends: user.dividends, success: true });
                })
        })
});

router.post("/delete/", (req, res) => {
    const { user_id, dividend_id } = req.body;
    User.findOne({ _id: user_id })
        .then(user => {
            if (!user) {
                res.json({ success: false, msg: "The user does not exist." });
            }

            user.dividends = user.dividends.filter(dividend => dividend.id !== dividend_id);
            user.save()
                .then(user => {
                    res.json({ dividends: user.dividends, success: true });
                })
        })
});

module.exports = router;
