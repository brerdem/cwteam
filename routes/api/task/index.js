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

    const {project_id, task} = req.body;


    Project.findOneAndUpdate({_id: project_id}, {
        $addToSet: {
            'tasks.backlog': task
        }
    }, {new: true}, function (err, project) {
        if (!err) {

            const insertedTask = project.tasks.backlog.pop();
            console.log('updated task', insertedTask);
            pusher.trigger(
                'projects',
                'task_added',
                {insertedTask, project_id}
            );
            res.status(200).send('ok');
        } else {
            res.status(400).send(err.message);
        }
    });

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
