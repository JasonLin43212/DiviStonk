const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

const portfoliosFromId = async (ids) => {
    let portfolios = [];
    for (let _id of ids) {
        await Portfolio.findOne({ _id })
            .then(portfolio => portfolios.push(portfolio))
            .catch(err => res.status(400).json({ error: err.message }));
    }
    return portfolios;
}


router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ success: false, msg: "Please enter all fields" });
    }

    User.findOne({ email })
        .then(user => {
            const invalidMsg = "The email or password is invalid.";
            if (!user) {
                return res.status(400).json({ success: false, msg: invalidMsg });
            }

            bcrypt.compare(password, user.password, (err, correct) => {
                if (err) {
                    throw err;
                }

                if (correct) {
                    const portfoliosPromise = portfoliosFromId(user.portfolios);
                    portfoliosPromise.then(portfolios => {
                        return res.json({
                            portfolios,
                            success: true,
                            id: user._id,
                            name: user.name,
                            email: user.email
                        })
                    })
                }
                else {
                    return res.status(400).json({ msg: invalidMsg });
                }
            })
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
