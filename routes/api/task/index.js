const router = require('express').Router();
require('../../../passport');
const Project = require('./../../../models/project');


router.post('/add', (req, res) => {

    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        active: true,
        team: req.body.team


    });
    project.save((err, project) => {
        if (!err) {
            res.status(200).json(project);
        } else {
            res.status(400).send(err);
        }
    })


});

router.post('/delete', (req, res) => {
    console.log('body is', req.body);


    Project.findByIdAndRemove(req.body.id, (err) => {
        if (!err) {
            res.status(200).json(req.body.id);
        } else {
            res.status(400).send(err);
        }
    })


});


module.exports = router;
