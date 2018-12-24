const router = require('express').Router();
const test = require('./test');
const auth = require('./auth');
const user = require('./user');
const axios = require('axios');

router.use('/test', test);
router.use('/auth', auth);
router.use('/user', user);


router.post('/projects', (req, res) => {
    axios.get('https://3.basecampapi.com/3587783/projects.json', {

        headers: {
            'Authorization': "Bearer " + req.body.access_token,
            'Content-Type': 'application/json',
            'User-Agent': 'Clockwork Team Management Test (clock@clockwork.com)',

        },
        data: {
            name: 'Clockwork Team Management Test'
        }


    })
        .then(function (response) {

            res.status(200).json(response.data);

        })
        .catch(function (error) {
            res.status(500);
            console.log('error from api/auth:' + error);

        });
});

router.post('/users', (req, res) => {
    axios.get('https://3.basecampapi.com/3587783/people.json', {

        headers: {
            'Authorization': "Bearer " + req.body.access_token,
            'Content-Type': 'application/json',
            'User-Agent': 'Clockwork Team Management Test (clock@clockwork.com)',

        },
        data: {
            name: 'Clockwork Team Management Test'
        }


    })
        .then(function (response) {
            console.log(response.headers);
            res.status(200).json(response.data);


        })
        .catch(function (error) {
            res.status(500);
            console.log('error from api/auth:' + error);

        });
});


router.get('/', (req, res) => {
    res.status(200).json({message: 'Connected to API!'});
});

module.exports = router;
