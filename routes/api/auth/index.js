const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");






router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'MIGpAgEAAiEAz5EYGJlmW/rIW6I9UpstI3/i6oabVoeGxoNHXIb4haMCAwEAAQIg\n' +
                'EI7WiT/Tdoru6MBse+Z9Fy8ZKtEHXlg9anfzbVGTR6ECEQDoKNQBV3to8xZ7vJFs\n' +
                '1kDVAhEA5OHBZ/lCwMSFp6tw9BsolwIQRXwK0Af98NBo10n+AKQzrQIQMwm8bQkC\n' +
                'P6YS/76VI3ni5QIQKrx93E1t59XUAS26ISvUcw==');
            return res.json({user, token});
        });
    })(req, res);


});

module.exports = router;
