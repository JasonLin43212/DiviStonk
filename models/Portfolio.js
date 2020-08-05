const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    stocks: {
        type: Array,
        default: [],
    },
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
