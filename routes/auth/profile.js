var express = require('express');
var router = express.Router();
var models = require('../../models/users');
var result = require('../../models/Response').RESPONSE;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var login_name = req.query.login_name;
    User.findOne({login_name:login_name},{_id:0},function (err, docs) {
        if(err){
            result.header.opCode = 0;
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
