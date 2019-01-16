let mongoose = require('mongoose');
let userSchema = mongoose.model("User").schema;
let Schema = mongoose.Schema;

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
        user: userSchema,
        effort: {
            type: Number,
            default: 3
        }
    }],
    owner: userSchema


});

let projectSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: Boolean,
    team: [userSchema],

    tasks: {
        backlog: [taskSchema],
        progress: [taskSchema],
        done: [taskSchema],
    },

    comments: [{
        type: String
    }]

});


projectSchema.index({"tasks.backlog._id": "text", "tasks.progress._id": "text", "tasks.done._id": "text", "team._id": "text" });


module.exports = mongoose.model('Project', projectSchema);
