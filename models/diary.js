var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Diary = new Schema({
    login_name: String,
    timeStamp: { type: Date, default: Date.now },
    text: String,
    lng: Number,
    lat: Number,
    photos:[{src: String}]
}, { collection: "user_diary" });

exports.Diary = mongoose.model('Diary',Diary);