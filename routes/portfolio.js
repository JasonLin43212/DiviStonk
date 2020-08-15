const express = require("express");
const router = express.Router();

const User = require('../models/User.js');
const Portfolio = require('../models/Portfolio.js');

const portfoliosFromId = (ids) => {
    let portfolios = [];
    for (let _id of ids) {
        Portfolio.find({ _id })
            .then(portfolio => portfolios.push(portfolio))
            .catch(err => res.status(400).json({ error: err.message }));
    }
    return portfolios;
}

router.post('/add/', (req, res) => {
    const { name, user_id } = req.body;
    const newPortfolio = new Portfolio({ name });
    newPortfolio.save()
        .then(new_portfolio => {
            User.findOne({ _id: user_id })
                .then(user => {
                    user.portfolios.push(new_portfolio._id);
                    user.save()
                        .then(user => {
                            res.json({
                                portfolio: new_portfolio,
                                success: true
                            })
                        })
                        .catch(err => res.status(400).json({ error: err.message, success: false}));
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

router.post('/edit/', (req, res) => {
    const { new_name, portfolio_id } = req.body;
    Portfolio.findOne({ _id: portfolio_id })
        .then(portfolio => {
            if (!portfolio) {
                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.name = new_name;
            portfolio.save()
                .then(portfolio => {
                    res.json({ portfolio });
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

router.post('/delete/', (req, res) => {
    const { portfolio_id, user_id } = req.body;
    User.findOne({ _id: user_id })
        .then(user => {
            if (!user) {
                res.status(400).json({ success: false, msg: "User does not exist." });
            }

            user.portfolios = user.portfolios.filter(portfolio => portfolio._id !== portfolio_id);
            user.save()
                .then(user => {
                    Portfolio.findOne({ _id: portfolio_id })
                        .then(portfolio => {
                            if (!portfolio) {
                                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
                            }

                            portfolio.deleteOne({ _id: portfolio_id })
                                .then(portfolio => {
                                    res.json({ portfolio });
                                })
                        })
                })
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

router.post('/add_stock/', (req, res) => {
    const { portfolio_id, ticker, quantity } = req.body;
    Portfolio.findOne({ _id: portfolio_id })
        .then(portfolio => {
            if (!portfolio) {
                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
            }

            const newStock = { quantity, ticker };
            portfolio.stocks.push(newStock);
            portfolio.save()
                .then(portfolio => {
                    res.json({ ticker, quantity, portfolio });
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

router.post('/edit_stock/', (req, res) => {
    const { portfolio_id, ticker, quantity } = req.body;
    Portfolio.findOne({ _id: portfolio_id })
        .then(portfolio => {
            if (!portfolio) {
                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.stocks = portfolio.stocks.map(stock => {
                if (stock.ticker === ticker) {
                    stock.quantity = quantity;
                }
            })
            portfolio.save()
                .then(portfolio => {
                    res.json({ ticker, quantity, portfolio });
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

router.post('/delete_stock/', (req, res) => {
    const { portfolio_id, ticker } = req.body;
    Portfolio.findOne({ _id: portfolio_id })
        .then(portfolio => {
            if (!portfolio) {
                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.stocks = portfolio.stocks.filter(stock => stock.ticker !== ticker)
            portfolio.save()
                .then(portfolio => {
                    res.json({ ticker, portfolio });
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

module.exports = router;
