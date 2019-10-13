const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
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

router.post('/login', async (req, res) => {
    // Validate request data   
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Checks for existing email
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email doesn\'t exist');

    // Password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;