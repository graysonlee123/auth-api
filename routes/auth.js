const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req,res) => {
    // Validate request data   
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Disallow duplicate emails
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    
    try {
        const savedUser = await user.save();
        res.send({
            user: user._id
        });
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    res.send('Login route detected');
});

module.exports = router;