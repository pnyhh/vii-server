var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* POST users listing. */
router.post('/', function(req, res, next) {
    var result = {
        header:{opCode:1},
        body:{
            param:req.body.phone,
            msg:'save users success'
        }
    };
    res.send(result);
});

module.exports = router;
