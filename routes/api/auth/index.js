const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('../../../passport');
const User = require('./../../../models/user');


router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET || 'uQCnvuHuaroLmca86tZ_CVZolA-QVJ2kt3Ra3x6ZDJ8Ei8_XncUulB5B9PFqUd3tiszu2LvpXSfpRKQ-ABlGqtmpCJbXcSJj2UFVWJMFThAMJ5w67X0_deG0jZQllFV0rv_FMTpeVxD7uoF52XfiE1-5C7ncAfK-DQ80UQ0RLEEtaXCvcWrNpGBszaW026EHw45g6rzWiFzHrA2myzQd7jTutYbFEFgL-NHCbuhtWs4zQLO1VgxfXjek0Vpv_mCJVQbEyfDLxRkVDb7RXKgPYuKptXYImxUlVDv277guNVws4n7EoJkQlfc4xtAYY7fexrF83RtMjjmd3SZ7JrK3Qw');
            return res.json({user, token});
        });
    })(req, res);


});


router.get('/check', passport.authenticate('jwt', {session: false}), (req, res) => {


   res.status(200).json({
       user : req.user

   })

});




router.post('/register', (req, res) => {

    if (req.body) {

        const {first_name, last_name, email, password} = req.body;
        let user = new User({first_name, last_name, email, password});


        user.save(function (err) {
            if (err) {
                console.log(err.code);
               res.status(400).send(err);
            } else {
                res.status(200).json({message: 'Successfully registered!'});
            }


        });

    }

});



module.exports = router;
