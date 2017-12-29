var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var models = require('../../models/auth');
var result = require('../../models/Response').RESPONSE;
var Auth = models.Auth;

/* POST users listing. */
router.post('/', function(req, res, next) {
    var login_name = req.body.login_name;
    var password = req.body.password;
    var phone = req.body.phone;
    Auth.create({login_name:login_name,phone:phone,password:password},function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'user exist';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            console.log(docs)
            result.header.opCode = 1;
            result.body.data = 'register success';
            result.body.msgs[0] = 'success';
            res.send(result);
        }
    });
});

module.exports = router;
