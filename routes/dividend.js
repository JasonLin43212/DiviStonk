const express = require("express");
const router = express.Router();
const lodash = require('lodash');
const yahooFinance = require('yahoo-finance');

const FIELDS = lodash.flatten(['y', 'd','r1', 'q'])
const SYMBOLS = ['AAPL', 'GOOG'];


router.get("/", (req, res) => {
    yahooFinance.quote({
        fields: FIELDS,
        symbols: SYMBOLS,
    }, function (err, quotes) {
        console.log(err, quotes);
    });
    res.send("hi");
});

module.exports = router;
