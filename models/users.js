var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    loginname: String,
    phone: String,
    gender: Number,
    birth: String,
    constellation: String,
    country: String,
    province: String,
    city: String,
    vip: Number,
    password: String,
    nickname: String,
    summary: String
});

exports.User = mongoose.model('User',UserSchema);