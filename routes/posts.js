const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'some title',
            body: 'post you should not access without being logged in'
        }
    });
});

module.exports = router;