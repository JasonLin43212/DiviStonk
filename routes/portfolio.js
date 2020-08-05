const express = require("express");
const router = express.Router();

const User = require('../models/User.js');
const Portfolio = require('../models/Portfolio.js');

router.post('/add/', (req, res) => {
    const { name, email } = req.body;
    const newPortfolio = new Portfolio({ name });
    newPortfolio.save()
        .then(new_portfolio => {
            User.findOne({ email })
                .then(user => {
                    user.portfolios.push(new_portfolio._id);
                    user.save()
                        .then(user => {
                            res.json({ email: user.email, portfolio: new_portfolio, success: true })
                        })
                        .catch(err => res.status(400).json({ error: err.message, success: false}));
                })
                .catch(err => res.status(400).json({ error: err.message, success: false}));
        })
        .catch(err => res.status(400).json({ error: err.message, success: false}));
});

module.exports = router;
