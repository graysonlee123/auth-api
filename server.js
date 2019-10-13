const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);

app.listen(port, () => {
    console.log(`Running server on port ${port}!`);
});