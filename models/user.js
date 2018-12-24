let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    first_name: String,
    last_name: String,
    createdAt: Date,
    avatar_url: String,
    email: String,
    title: String,
    active: Boolean

});
module.exports = mongoose.model('User', userSchema);
