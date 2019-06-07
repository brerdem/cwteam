const path = require('path');

const routes = require('express').Router();
const api = require('./api');
const passport = require('passport');
require('../passport');


routes.use('/api', api);

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = routes;
