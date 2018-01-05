var express = require('express');
var router = express.Router();
var models = require('../../models/diary');
var result = require('../../models/Response').RESPONSE;
var Diary = models.Diary;

/* POST users listing. */
router.get('/', function(req, res, next) {
    var login_name = req.query.login_name;
    var _id = req.query._id;
    Diary.find(
        {$and:[
            {login_name:login_name},
            {_id:{$gt:_id}}
        ]}
        ,function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'server error';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            result.header.opCode = 1;
            result.body.data = docs;
            result.body.msgs[0] = 'success';
            res.send(result);
        }
    });
});

module.exports = router;
