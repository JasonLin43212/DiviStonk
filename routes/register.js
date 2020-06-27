const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(400).json({ msg: `The email ${email} is taken.` });
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    const newUser = new User({ name, email, password: hash });
                    newUser.save()
                        .then(new_user => {
                            res.json({ name, email, hash });
                        })
                        .catch(err => res.status(400).json({ error: err.message}));
                })
            })
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
