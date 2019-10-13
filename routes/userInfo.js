const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.get('/', verify, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(400).send('Error finding user!');
        
        res.send(user);
    });
});

module.exports = router;