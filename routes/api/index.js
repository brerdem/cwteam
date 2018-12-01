const routes = require('express').Router();
const test = require('./test');

routes.use('/test', test);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected to API!' });
});

module.exports = routes;
