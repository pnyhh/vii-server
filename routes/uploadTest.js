var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var util = require('util');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* UPLOAD listing. */
router.post('/', multipartMiddleware,function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
});

module.exports = router;
