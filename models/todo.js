let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    title: {type: String, required: true},
    note: String,
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

module.exports = mongoose.model('Todo', todoSchema);
