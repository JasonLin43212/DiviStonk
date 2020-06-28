const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

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
                    return res.json({ success: true, id: user.id, name: user.name, email: user.email })
                }
                else {
                    return res.status(400).json({ msg: invalidMsg });
                }
            })
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
