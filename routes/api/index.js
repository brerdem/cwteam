const routes = require('express').Router();
const test = require('./test');
const auth = require('./auth');

routes.use('/test', test);
routes.use('/auth', auth);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to API!' });
});

module.exports = routes;
