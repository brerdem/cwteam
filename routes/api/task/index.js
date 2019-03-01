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


router.post('/delete', (req, res) => {

    console.log('req.body -->', req.body);

    Task.findOneAndRemove({_id: req.body.id}, (err) => {
        if (!err) {

            pusher.trigger(
                'projects',
                'task_deleted',
                {id: req.body.id}
            );

            res.status(200).send("task removed");
        } else {
            console.log('err -->', err);
            res.status(400).send(err);
        }
    })

});

router.post('/reorder', (req, res) => {

    const orderType = req.query.type || '';
    const {sourceIndex, destinationIndex, start, finish, task, socket_id} = req.body;

    if (orderType && orderType === 'project') {

        Task.find({project_id: req.body.project_id}).lean().exec(function (err, tasks) {
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
                        console.log('task reorder project error -->', err);
                    }
                });

            } else {
                console.log(err);
                res.status(400).send("Reorder task project error:" + err);
            }
        });
    } else if (orderType === 'user') {
        let user_id = req.body.user_id;

        Task.find({
            status: start,
            assignees: {$elemMatch: {user: user_id}}
        }).populate('assignees.user').lean().exec(function (err, tasks) {

            const startTasks = tasks.sort((a, b) => a.assignees.find(u => u.user._id.equals(user_id)).order - b.assignees.find(u => u.user._id.equals(user_id)).order);
            startTasks.splice(sourceIndex, 1);
            startTasks.splice(destinationIndex, 0, task);
            console.log('startTasks -->', startTasks);
            startTasks.forEach((t, i) => t.assignees.find(u => u.user._id.toString() === user_id).order = i);

            async.eachSeries(startTasks, function updateObject(task, done) {
                // Model.update(condition, doc, callback)
                Task.updateOne({_id: task._id}, {$set: {assignees: task.assignees}}, done);
            }, function allDone(err) {
                if (!err) {
                    pusher.trigger(
                        'projects',
                        'user_task_updated',
                        req.body,
                        socket_id
                    );
                    res.status(200).send('ok');
                } else {
                    res.status(400).send("Reorder user task error: " + err);
                }
            });

            // res.status(200).send('ok');
        })

    }

});

module.exports = router;
