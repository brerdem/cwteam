const router = require('express').Router();
require('../../../passport');
const Task = require('./../../../models/task');


router.post('/add', (req, res) => {

    const {title, note, assignees, department, project_id} = req.body;

    let task = new Task({
        project_id,
        title,
        note,
        department,
        assignees
    });
    task.save((err, task) => {
        if (!err) {
            res.status(200).json(task);
        } else {
            res.status(400).send(err);
        }
    })


});



module.exports = router;
