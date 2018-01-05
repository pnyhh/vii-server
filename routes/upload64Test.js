var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar64/';
var domain = "http://localhost:3000";
var im = require('imagemagick');

/* POST users listing. */
router.post('/', function(req, res, next) {
    var login_name = req.body.login_name;
    var photos = req.body.photos;
    var urls = [];

    for(var i=0;i<photos.length;i++){
        var avatarName = login_name+ '-' + Date.now() + '-img';
        var ext = '.jpg'
        var imgUrlObj = {};

        //显示地址；
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName + ext;

        imgUrlObj.imgName = avatarName;
        imgUrlObj.ext = ext;
        urls.push(imgUrlObj);

        var base64 = photos[i].replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64, 'base64');

        fs.writeFileSync('public/avatar64/'+avatarName+ext, dataBuffer, 'binary');

        resize(avatarName,ext);
    }

    function resize(avatarName,ext) {
        //xs
        im.resize({
            srcData: fs.readFileSync('public/avatar64/'+avatarName+ext, 'binary'),
            width:   50
        }, function(err, stdout, stderr){
            if (err) throw err
            fs.writeFileSync('public/avatar64/'+avatarName+'-xs'+ext, stdout, 'binary');
            console.log('resized base64 to fit within base width 50px')
        });
        //sm
        im.resize({
            srcData: fs.readFileSync('public/avatar64/'+avatarName+ext, 'binary'),
            width:   100
        }, function(err, stdout, stderr){
            if (err) throw err
            fs.writeFileSync('public/avatar64/'+avatarName+'-sm'+ext, stdout, 'binary');
            console.log('resized base64 to fit within base width 100px')
        });
        //md
        im.resize({
            srcData: fs.readFileSync('public/avatar64/'+avatarName+ext, 'binary'),
            width:   200
        }, function(err, stdout, stderr){
            if (err) throw err
            fs.writeFileSync('public/avatar64/'+avatarName+'-md'+ext, stdout, 'binary');
            console.log('resized base64 to fit within base width 200px')
        });
    }

    done();
    function done() {
        var result = {
            header:{opCode:1},
            body:{
                newPaths:urls,
                msg:'successful'
            }
        };
        res.send(result);
    }
});

module.exports = router;
