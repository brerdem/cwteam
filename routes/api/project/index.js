const router = require('express').Router();
require('../../../passport');
const Project = require('./../../../models/project');


const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '689385',
    key: '8042ee8184c51b5ff049',
    secret: '9ee8d1d20c3ceb337d83',
    cluster: 'eu',
    useTLS: true,
});


router.post('/add', (req, res) => {

    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        budget: req.body.budget,
        createdAt: new Date(),
        active: true,
        team: req.body.team


    });
    project.save((err, project) => {
        if (!err) {

            pusher.trigger(
                'projects',
                'project_added',
                project
            );
            res.status(200).send("project added");

        } else {
            console.log(err);
            res.status(400).send(err);
        }
    })


});

router.post('/delete', (req, res) => {
    console.log('body is', req.body);


    Project.findByIdAndRemove(req.body.id, (err) => {
        if (!err) {
            pusher.trigger(
                'projects',
                'project_deleted',
                req.body.id
            );

            res.status(200).send("project deleted");
        } else {
            console.log(err);
            res.status(400).send(err);
        }
    })


});

router.get('/:id/team', (req, res) => {


    Project.findOne({_id: req.params.id}, 'team').populate('team').exec((err, team) => {
        if (!err) {
            res.status(200).json(team);
        } else {
            res.status(400).send(err);
        }
    })


});



module.exports = router;
