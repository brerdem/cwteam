const router = require('express').Router();
const User = require('./../../../models/user');




router.get('/all', (req, res) => {

    User.find({}, (err, users) => {
        if (!err) {
            res.status(200).json(users);
        } else {
            res.status(400).send(err);
        }
    });


});


module.exports = router;
