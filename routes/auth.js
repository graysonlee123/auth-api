const router = require('express').Router();

router.post('/register', (req,res) => {
    res.send('Register route detected');
});

router.post('/login', (req, res) => {
    res.send('Login route detected');
});

module.exports = router;