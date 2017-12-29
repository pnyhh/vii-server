var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Auth = new Schema({
    login_name: String,
    phone: String,
    password: String
}, { collection: "user_auth" });

exports.Auth = mongoose.model('Auth',Auth);