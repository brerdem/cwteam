let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let projectSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    createdAt: Date,
    startDate: Date,
    endDate: Date,
    active: Boolean,
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

module.exports = mongoose.model('Project', projectSchema);
