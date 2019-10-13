const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Connected to database!');
    }
);

// Import routes
const authRoute = require('./routes/auth');

// Routes middleware
app.use('/api/user', authRoute);

app.listen(port, () => {
    console.log(`Running server on port ${port}!`);
});