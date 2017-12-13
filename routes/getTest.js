var express = require('express');
var router = express.Router();
var models = require('../models/users');
var result = require('../models/Response').RESPONSE;
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var loginname = req.query.loginname;
    User.find({login_name:loginname},{_id:0},function (err, docs) {
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
