var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var modelAuth = require('../../models/auth');
var modelsUser = require('../../models/users');
var result = require('../../models/Response').RESPONSE;
var Auth = modelAuth.Auth;
var User = modelsUser.User;

/* POST users listing. */
router.post('/', function(req, res, next) {
    var login_name = req.body.login_name;
    var password = req.body.password;
    var phone = req.body.phone;
    var nickname = req.body.nickname;
    var gender = req.body.gender;
    var constellation = req.body.constellation;
    var birth = req.body.birth;
    var province = req.body.province;
    var city = req.body.city;
    var district = req.body.district;
    var summary = req.body.summary;
    Auth.create(
        {
            login_name:login_name,
            phone:phone,
            password:password
        }
        ,function (err, docs) {
        if(err){
            result.header.opCode = 0;
            result.body.data = 'user exist';
            result.body.msgs[0] = 'error';
            res.send(result);
        }else{
            User.create(
                {
                    login_name:login_name,
                    phone:phone,
                    password:password,
                    nickname: nickname,
                    gender:gender,
                    constellation:constellation,
                    birth:birth,
                    province:province,
                    vip:'0',
                    city:city,
                    district:district,
                    summary:summary
                }
                ,function(err, docs){
                    if(err){
                        result.header.opCode = 0;
                        result.body.data = 'profile error';
                        result.body.msgs[0] = 'error';
                        res.send(result);
                    }else{
                        result.header.opCode = 1;
                        result.body.data = 'register success';
                        result.body.msgs[0] = 'success';
                        res.send(result);
                    }
                })
        }
    });
});

module.exports = router;
