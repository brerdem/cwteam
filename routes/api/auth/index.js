const router = require('express').Router();
const axios = require('axios');
const Auth = require('../../../models/auth');

router.post('/', (req, res) => {
    axios.get('https://launchpad.37signals.com/authorization.json', {

        headers: {
            'Authorization': "Bearer " + req.body.access_token,
            'Content-Type': 'application/json'
        },

    })
        .then(function (response) {
            console.log(response.data);
            res.status(200).json(response.data);


        })
        .catch(function (error) {
            res.status(500);
            console.log('error from api/auth:' + error);

        });
});




router.post('/save_token', (req, res) => {
    const query = {};
    const update = {
        access_token: req.body.access_token,
        expires_in: req.body.expires_in,
        refresh_token: req.body.refresh_token
    };
    Auth.findOneAndUpdate(query, update, {upsert:true, new:true}, function (error) {
        res.status(200).send("tokens has been saved");
        if (error) {
            console.error(error);
        }
    });


});
router.post('/login', (req, res) => {
    const query = {};
    const update = {
        access_token: req.body.access_token,
        expires_in: req.body.expires_in,
        refresh_token: req.body.refresh_token
    };
    Auth.findOneAndUpdate(query, update, {upsert:true, new:true}, function (error) {
        res.status(200).send("tokens has been saved");
        if (error) {
            console.error(error);
        }
    });


});

module.exports = router;
