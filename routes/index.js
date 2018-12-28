const routes = require('express').Router();
const api = require('./api');
const passport = require('passport');
require('../passport');


routes.use('/api', api);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
