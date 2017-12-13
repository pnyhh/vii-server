var express = require('express');
var router = express.Router();

/* GET users listing. */
var result = {
  header:{opCode:1},
  body:{
    msg:'get users success'
  }
};
router.get('/', function(req, res, next) {
  res.send(result);
});

module.exports = router;
