var express = require('express');
var router = express.Router();
var models = require('../../models/diary');
var result = require('../../models/Response').RESPONSE;
var Diary = models.Diary;

/* POST users listing. */
router.get('/', function(req, res, next) {
    var login_name = req.query.login_name;
    var latMin = req.query.latMin;
    var latMax = req.query.latMax;
    var lngMin = req.query.lngMin;
    var lngMax = req.query.lngMax;

    Diary.find(
        // {login_name:login_name,lng:{$and:[{$gt:lngMin},{$lt:lngMax}]},lat:{$and:[{$gt:latMin},{$lt:latMax}]}},
        {$and:[
                {login_name:login_name},
                {lat:{$gt:latMin}},
                {lat:{$lt:latMax}},
                {lng:{$gt:lngMin}},
                {lng:{$lt:lngMax}}
        ]},
        {photos:0}
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
