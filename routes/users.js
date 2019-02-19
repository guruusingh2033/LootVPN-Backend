var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify("sfsdfsdfsfs"));
});

router.get('/test', function(req, res, next) {
  res.send(JSON.stringify("abcdef"));
});

module.exports = router;





