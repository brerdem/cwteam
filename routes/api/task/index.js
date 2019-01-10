const router = require('express').Router();
require('../../../passport');
const Task = require('./../../../models/task');
const async = require('async');

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

router.post('/reorder', (req, res) => {

    const {newTasksId} = req.body;

    Task.find().cursor().eachAsync(task => {
        let index = newTasksId.findIndex(id => id == task._id);
        task.order = index;
        return task.save().then(task => console.log(task));        // Need promise
    }).then((err) => {
        if (!err) {
            console.log('yoooooooo');
            res.status(200).send(newTasksId);
        } else {
            console.log(err);
            res.status(400).send(err);
        }
    });

    /* async.eachOfSeries(newTasksId, function (obj, key, done) {

         Task.findOneAndUpdate({_id: obj._id}, {$set: {title: 'yooooo'}}).exec(done);


     }, function (err) {


         if (!err) {
             console.log('yoooooooo');
             res.status(200).send(newTasksId);
         } else {
             console.log(err);
             res.status(400).send(err);
         }
     });*/

});

module.exports = router;
