var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Auth = new Schema({
    login_name: {type: String, unique: true},
    phone: {type: String, unique: true},
    password: String
}, { collection: "user_auth" });

exports.Auth = mongoose.model('Auth',Auth);