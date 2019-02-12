const router = require('express').Router();
require('../../../passport');
const Project = require('./../../../models/project');
const Task = require('./../../../models/task');

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '689385',
    key: '8042ee8184c51b5ff049',
    secret: '9ee8d1d20c3ceb337d83',
    cluster: 'eu',
    useTLS: true,
});

router.post('/add', (req, res) => {

console.log('req.body -->', req.body);
    let task = new Task(req.body);
    const {assignees, owner} = req.body;

    task.save((err, task) => {
        if (!err) {
            console.log('task -->', task);
            task.assignees = req.body.assignees;
            pusher.trigger(
                'projects',
                'task_added',
                {task, assignees, owner}

            );

            res.status(200).json(task);
        } else {
            console.log('err -->', err);
            res.status(400).send(err);
        }
    })

});

router.post('/reorder', (req, res) => {

    const {project_id, sourceIndex, destinationIndex, start, finish, socket_id} = req.body;

    Project.findOne({_id: project_id}, 'tasks', function (err, tasks) {
        if (!err) {
            let temp = tasks.tasks;
            const task = temp[start][sourceIndex];

            temp[start].splice(sourceIndex, 1);
            temp[finish].splice(destinationIndex, 0, task);

            tasks.tasks = temp;
            tasks.save().then(() => {
                pusher.trigger(
                    'projects',
                    'task_updated',
                    req.body,
                    socket_id
                );

                res.status(200).send('ok');

            }).catch(err => console.log("err while saving", err));

        } else {
            console.log(err);
            res.status(400).send("Reorder task project not found");
        }
    });

});

module.exports = router;
