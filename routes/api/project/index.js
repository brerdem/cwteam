const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('../../../passport');
const Project = require('./../../../models/project');


router.post('/add', (req, res) => {
    console.log('body is', req.body);

    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        active: true,


    });
    project.save((err, project) => {
        if (!err) {
            res.status(200).json(project);
        } else {
            res.status(400).send(err);
        }
    })




});




module.exports = router;
