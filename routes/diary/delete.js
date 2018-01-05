var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var models = require('../../models/diary');
var result = require('../../models/Response').RESPONSE;
var Diary = models.Diary;

/* POST users listing. */
router.post('/', function(req, res, next) {
    var login_name = req.body.login_name;
    var timeStamp = req.body.timeStamp;
    var _id = req.body._id;
    Diary.remove({login_name:login_name,timeStamp:timeStamp,_id:_id},function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'server error';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            result.header.opCode = 1;
            result.body.data = 'diary deleted';
            result.body.msgs[0] = 'success';
            res.send(result);
        }
    });
});

module.exports = router;
