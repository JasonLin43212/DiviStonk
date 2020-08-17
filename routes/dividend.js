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
