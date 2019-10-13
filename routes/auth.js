const router = require('express').Router();
const User = require('../models/User');

// Validation
const Joi = require('@hapi/joi');

const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
}

router.post('/register', async (req,res) => {
    // Validate request data
    const {name, email, password} = req.body;
    const {error} = Joi.validate(
        {
            name: name,
            email: email,
            password: password
        }, 
        schema
    );
    
    if (error) return res.status(400).send(error.details[0].message);

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