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
    Auth.find({login_name:login_name},{_id:0},function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'server error';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            if(docs && docs.length){
                if(docs[0].login_name === login_name && docs[0].password === password){
                    result.header.opCode = 1;
                    result.body.data = 'auth success';
                    result.body.msgs[0] = 'success';
                    res.send(result);
                }else{
                    result.header.opCode = 0;
                    result.body.data = 'password error';
                    result.body.msgs[0] = 'success';
                    res.send(result);
                }
            }else{
                result.header.opCode = 0;
                result.body.data = 'need register';
                result.body.msgs[0] = 'success';
                res.send(result);
            }
        }
    });
});

module.exports = router;
