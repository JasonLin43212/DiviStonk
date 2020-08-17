const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    portfolios: {
        type: Array,
        default: [],
    },
    dividends: {
        type: Array,
        default: [],
    },
    num_dividends_created: {
        type: Number,
        default: 0,
    }
});

module.exports = User = mongoose.model('user', UserSchema);
