var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var mysqlSetting = {
  host: 'localhost',
  user: 'bbcApp',
  password: '3gFRpfbbcApp',
  database: 'bbcApp',
  dateStrings: 'true',
  multipleStatements: 'true'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  connection.query('SELECT * FROM threadlist; SELECT category FROM category;', function(error, results, fields){
    if (error == null){
      var data = {title:'bbcApp', content:results[0]};
      data.category = results[1];
      res.render('index', data);
    }
  });
  connection.end();
});

router.post('/', function(req, res, next){
  var title = req.body['title'];
  var data = {'title': title};
  var connection = mysql.createConnection(mysqlSetting);
  connection.connect();
  connection.query('INSERT INTO threadlist set ?', data, function(error, results, fields){
    res.redirect('/');
  });
});
module.exports = router;
