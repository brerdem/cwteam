let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

let taskSchema = new Schema({
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    title: {type: String, required: true},
    note: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDate: Date,
    endDate: Date,
    show: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    },
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
    order: {type: Number, default: 0},
    assignees: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        effort: {
            type: Number,
            default: 1
        },
        order: Number,
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

//taskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'order'});

module.exports = mongoose.model('Task', taskSchema);
