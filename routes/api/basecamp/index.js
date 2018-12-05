const router = require('express').Router();

router.get('/projects', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
router.post('/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

module.exports = router;