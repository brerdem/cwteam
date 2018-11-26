const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const BasecampStrategy = require('passport-basecamp').Strategy;

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

//passport uses
app.use(passport.initialize());
app.use(passport.session());

const redirect_uri = 'https://cwteam.ngrok.io/callback';
const credentials = {
    client: {
        id: '5fccfc8fcf0fa68e8ceab31a5ed7422beb4e1f2b',
        secret: 'ffa278b2c0a9d6b8430b33758899a1f679f9eb04'
    },
    auth: {

        tokenHost: 'https://launchpad.37signals.com/',
        authorizePath: 'authorization/new',
        tokenPath: 'authorization/token'

    }

};

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


passport.use(new BasecampStrategy({
        clientID: credentials.client.id,
        clientSecret: credentials.client.secret,
        callbackURL: redirect_uri
    },
    function(accessToken, refreshToken, profile, cb) {

        process.nextTick(function () {

            // To keep the example simple, the user's 37signals profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the 37signals account with a user record in your database,
            // and return that user instead.
            console.log(profile.id);
        });

    }
));

app.get('/auth',
    passport.authenticate('basecamp'));

app.get('/callback',
    passport.authenticate('basecamp', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


// Index route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
