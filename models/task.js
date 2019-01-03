let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let taskSchema = new Schema({
    title: {type: String, required: true},
    note: String,
    createdAt: Date,
    startDate: Date,
    endDate: Date,
    active: Boolean,
    status: {
        type: String,
        enum: ['backlog', 'progress', 'done'],
        default: 'backlog'
    },
    department: {
        type: String,
        enum: ['Yazılım', 'Sosyal Medya', 'Tasarım', 'Müşteri'],
        default: 'Yazılım'
    },

    assignees: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        effort: {
            type: Number
        }
    }],
    comments: [{
        type: String
    }]

});

module.exports = mongoose.model('Task', taskSchema);
