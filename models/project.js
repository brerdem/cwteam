let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let projectSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    startDate: Date,
    endDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: Boolean,
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    tasks: {
        backlog: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        progress: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        done: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],

    },
    budget: Number,

    comments: [{
        type: String
    }]

});

module.exports = mongoose.model('Project', projectSchema);
