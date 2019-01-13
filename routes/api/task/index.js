const router = require('express').Router();
require('../../../passport');
const Project = require('./../../../models/project');

router.post('/add', (req, res) => {

    const {title, note, assignees, department, project_id} = req.body;

    Project.findOneAndUpdate({_id: project_id}, {
        $addToSet: {
            'tasks.backlog': {
                title,
                note,
                assignees,
                department
            }
        }
    }, {new: true}, function (err, project) {
        if (!err) {
            res.status(200).send('ok');
        } else {
            res.status(400).send(err.message);
        }
    });

});

router.post('/reorder', (req, res) => {

    const {project_id, sourceIndex, destinationIndex, sourceColumn, destinationColumn} = req.body;

    Project.findOne({_id: project_id}, 'tasks', function (err, tasks) {
        if (!err) {
            let temp = tasks.tasks;
            const task = temp[sourceColumn][sourceIndex];

            temp[sourceColumn].splice(sourceIndex, 1);
            temp[destinationColumn].splice(destinationIndex, 0, task);

            tasks.tasks = temp;
            tasks.save().then(task => {

                res.status(200).send('ok');

            }).catch(err => console.log("err while saving", err));


        } else {
            console.log(err);
            res.status(400).send("Reorder task project not found");
        }
    });

});

module.exports = router;
