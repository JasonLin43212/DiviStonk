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
    if (name.trim() === '') {
        res.json({ error: 'Please enter a name for your portfolio.', success: false });
    }
    Portfolio.findOne({ name })
        .then(portfolio => {
            if (portfolio) {
                res.json({ error: 'A portfolio with that name already exists.', success: false });
            }

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
                                        success: true,
                                    })
                                })
                                .catch(err => res.status(400).json({ error: err.message, success: false}));
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
                res.json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.name = new_name;
            portfolio.save()
                .then(portfolio => {
                    res.json({
                        portfolio,
                        success: true,
                     });
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
                res.json({ success: false, msg: "User does not exist." });
            }
            user.portfolios = user.portfolios.filter(a_portfolio_id => {
                return a_portfolio_id.toString() !== portfolio_id;
            });
            user.save()
                .then(user => {
                    Portfolio.findOne({ _id: portfolio_id })
                        .then(portfolio => {
                            if (!portfolio) {
                                res.status(400).json({ success: false, msg: "Portfolio does not exist." });
                            }

                            portfolio.deleteOne({ _id: portfolio_id })
                                .then(portfolio => {
                                    res.json({
                                        portfolio,
                                        success: true,
                                    });
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
                res.json({ success: false, msg: "Portfolio does not exist." });
            }

            if (portfolio.stocks.some(stock => stock.ticker === ticker)) {
                res.json({ success: false, msg: "Portfolio already has this stock. Go to Home to change the amount you have." });
            }

            const newStock = { quantity, ticker };

            portfolio.stocks.push(newStock);
            portfolio.save()
                .then(portfolio => {
                    res.json({
                        portfolio,
                        success: true,
                     });
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
                res.json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.stocks = portfolio.stocks.map(stock => {
                if (stock.ticker === ticker) {
                    stock.quantity = quantity;
                }
            })
            portfolio.save()
                .then(portfolio => {
                    res.json({
                        portfolio,
                        success: true,
                    });
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
                res.json({ success: false, msg: "Portfolio does not exist." });
            }

            portfolio.stocks = portfolio.stocks.filter(stock => stock.ticker !== ticker)
            portfolio.save()
                .then(portfolio => {
                    res.json({
                        portfolio,
                        success: true,
                    });
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

module.exports = router;
