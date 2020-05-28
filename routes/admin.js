var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('page', {title:'管理人だより'});
});

module.exports = router;
