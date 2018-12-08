let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let authSchema = new Schema({
    access_token: String,
    expires_in: String,
    refresh_token: String

});
module.exports = mongoose.model('Auth', authSchema);
