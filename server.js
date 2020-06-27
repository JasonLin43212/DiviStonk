const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "DiviStonk",
};
// Connect to Mongo
mongoose
    .connect(process.env.REACT_APP_MONGO_URL, options)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use('/api/dividend', require('./routes/dividend.js'));
app.use('/api/register', require('./routes/register.js'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Load index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



// Select port
const port = process.env.PORT || 5000;

// Make app listen to that port
app.listen(port, () => console.log(`Server started on port ${port}`));
