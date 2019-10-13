const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    res.send('Login route detected');
});

module.exports = router;