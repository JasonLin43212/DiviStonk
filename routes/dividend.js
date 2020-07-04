const express = require("express");
const router = express.Router();
const lodash = require('lodash');
const yahooFinance = require('yahoo-finance');


router.post("/", (req, res) => {
    yahooFinance.quote({
        symbols: req.body.tickers,
    }, function (err, quotes) {
        if (err) {
            return res.status(400).json({ success: false, msg: err.message });
        }
        else {
            return res.json({ quotes, success: true });
        }
    });
});

module.exports = router;
