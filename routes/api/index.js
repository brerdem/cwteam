const passport = require("passport");
require('../../passport');
const Project = require('./../../models/project');
const Task = require('./../../models/task');

const router = require('express').Router();
const auth = require('./auth');
const user = require('./user');
const task = require('./task');
const project = require('./project');

router.use('/auth', auth);
router.use('/user', user);
router.use('/task', task);
router.use('/project', passport.authenticate('jwt', {session: false}, null), project);




router.get('/projects', (req, res) => {


    Project.find({}, function(err, projects) {
        if (!err) {
            res.status(200).json(projects);
        } else {
            console.log(err);
            res.status(400).send(err);
        }
    })
});


router.get('/', (req, res) => {
    res.status(200).json({message: 'Connected to API!'});
});

module.exports = router;
