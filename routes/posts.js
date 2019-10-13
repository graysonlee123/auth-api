const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        posts: {
            title: 'some title',
            body: 'post you should not access without being logged in'
        }
    });
});

module.exports = router;