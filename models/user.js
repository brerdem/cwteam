let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: [true, "boş kalamaz"]},
    first_name: {type: String, required: [true, "boş kalamaz"]},
    last_name: {type: String, required: [true, "boş kalamaz"]},
    email: {
        type: String,
        lowercase: true,
        required: [true, "boş kalamaz"],
        match: [/\S+@\S+\.\S+/, 'geçersiz']

    },
    avatar_url: String,
    avatar_bg: String,
    password: String,
    hourly_fee: {
        type: Number,
        default: 100
    },
    department: {
        type: String,
        enum: ['Yazılım', 'Sosyal Medya', 'Tasarım', 'Müşteri'],
        default: 'Yazılım'
    },
    title: String,
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('User', userSchema);
