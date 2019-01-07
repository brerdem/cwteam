let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    first_name: {type: String, required: [true, "boş kalamaz"]},
    last_name: {type: String, required: [true, "boş kalamaz"]},
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar_url: String,
    avatar_bg: String,
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: [true, "is already registered"],
        required: [true, "boş kalamaz"],
        match: [/\S+@\S+\.\S+/, 'geçersiz']

    },
    title: String,
    active: Boolean,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]


});

module.exports = mongoose.model('User', userSchema);
