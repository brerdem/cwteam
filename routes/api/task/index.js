const router = require('express').Router();
require('../../../passport');
const Project = require('./../../../models/project');
const Task = require('./../../../models/task');

const async = require('async');

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

    const {project_id, sourceIndex, destinationIndex, start, finish, task, socket_id} = req.body;

    Task.find({project_id: project_id}).lean().exec(function (err, tasks) {
        if (!err) {

            const startTasks = tasks.filter(t => t.status === start).sort((a, b) => a.order - b.order);
            const finishTasks = tasks.filter(t => t.status === finish).sort((a, b) => a.order - b.order);
            let newTasks = [];
            startTasks.splice(sourceIndex, 1);
            if (start === finish) {

                startTasks.splice(destinationIndex, 0, task);
                startTasks.forEach((t, i) => t.order = i);
                newTasks = startTasks;
            } else {

                finishTasks.splice(destinationIndex, 0, task);
                task.status = finish;
                finishTasks.forEach((t, i) => t.order = i);
                startTasks.forEach((t, i) => t.order = i);
                newTasks = startTasks.concat(finishTasks);

            }

            async.eachSeries(newTasks, function updateObject(task, done) {
                // Model.update(condition, doc, callback)
                Task.updateOne({_id: task._id}, {$set: {order: task.order, status: task.status}}, done);
            }, function allDone(err) {
                if (!err) {
                    pusher.trigger(
                        'projects',
                        'task_updated',
                        req.body,
                        socket_id
                    );
                    res.status(200).send('ok');
                } else {
                    console.log('task reorder error -->', err);
                }
            });




        } else {
            console.log(err);
            res.status(400).send("Reorder task project not found");
        }
    });

});

module.exports = router;
