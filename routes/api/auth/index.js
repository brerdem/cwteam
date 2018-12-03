const router = require('express').Router();
const axios = require('axios');
const localStorage = require('localStorage');
const Auth = require('../../../models/Auth');

router.post('/', (req, res) => {
    console.log(localStorage.getItem('id_token'));
    axios.get('https://launchpad.37signals.com/authorization.json', {

        headers: {
            'Authorization': "Bearer " + req.body.access_token,
            'Content-Type' : 'application/json'
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


router.post('/write', (req, res) => {
    console.log(localStorage.getItem('id_token'));
    let auth = new Auth();
    auth.access_token = req.body.access_token;
    auth.expires_in = req.body.expires_in;
    auth.refresh_token = req.body.refresh_token;
    res.status(200).send("ok");
});

module.exports = router;
