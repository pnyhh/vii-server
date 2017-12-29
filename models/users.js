var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login_name: String,
    phone: String,
    gender: Number,
    birth: String,
    constellation: String,
    country: String,
    province: String,
    city: String,
    district: String,
    vip: Number,
    nickname: String,
    summary: String
}, { collection: "users" });

exports.User = mongoose.model('User',UserSchema);