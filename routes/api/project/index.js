const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('../../../passport');
const Project = require('./../../../models/project');


router.post('/add', (req, res) => {
    console.log(req.body);

    let project = new Project({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        active: true,


    });
    project.save((err) => {
        if (!err) {
            res.status(200).send('OK');
        } else {
            res.status(400).send(err);
        }
    })




});




module.exports = router;
