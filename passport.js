const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');




passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({email, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }
                return cb(null, user, {message: 'Logged In Successfully'});
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'MIGpAgEAAiEAz5EYGJlmW/rIW6I9UpstI3/i6oabVoeGxoNHXIb4haMCAwEAAQIg\n' +
        'EI7WiT/Tdoru6MBse+Z9Fy8ZKtEHXlg9anfzbVGTR6ECEQDoKNQBV3to8xZ7vJFs\n' +
        '1kDVAhEA5OHBZ/lCwMSFp6tw9BsolwIQRXwK0Af98NBo10n+AKQzrQIQMwm8bQkC\n' +
        'P6YS/76VI3ni5QIQKrx93E1t59XUAS26ISvUcw=='
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
