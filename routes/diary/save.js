var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var domain = "http://localhost:3000";
var im = require('imagemagick');

var models = require('../../models/diary');
var result = require('../../models/Response').RESPONSE;
var Diary = models.Diary;

/* POST users listing. */
router.post('/', function(req, res, next) {
    var login_name = req.body.login_name;
    var text = req.body.text;
    var timeStamp = Date.now();
    var position = req.body.position;
    var photos = req.body.photos;

    Diary.create({login_name:login_name,text:text,timeStamp:timeStamp,lng:position.lng,lat:position.lat,photos:photos},function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'server error';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            result.header.opCode = 1;
            result.body.data = 'save success';
            result.body.msgs[0] = 'success';
            res.send(result);
        }
    });
});

module.exports = router;
