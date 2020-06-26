const express = require("express");
const router = express.Router();
const lodash = require('lodash');
const yahooFinance = require('yahoo-finance');

const SYMBOLS = ['AAPL', 'GOOG'];


router.get("/", (req, res) => {
    yahooFinance.quote({
        symbols: SYMBOLS,
    }, function (err, quotes) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(quotes);
        }
    });
});

module.exports = router;
