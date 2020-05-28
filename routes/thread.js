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

router.get('/', function(req, res, next) {
    var guroupNo = req.query.gn;
    var connection = mysql.createConnection(mysqlSetting);
    connection.connect();
    var sql = 'SELECT * FROM threadcontents WHERE guroupNo=?; SELECT title FROM threadlist WHERE id=?'
    connection.query(sql, [guroupNo, guroupNo], function(error, results, fields){
      if (error == null){
        var data = {
          guroupNo:guroupNo,
          content:results[0],
          title: results[1],
        }
        res.render('thread', data);
      }else{
        console.log(error)
      }
    });
    connection.end();
  });


  router.post('/', function(req, res, next){
    var ip = req.ip
    var name = req.body.name;
    var message = req.body.message;
    var guroupNo = req.body.gn;
    var data = {'name':name, 'message':message, 'guroupNo':guroupNo, 'ipId':ip};
    var connection = mysql.createConnection(mysqlSetting);
    connection.connect();
    connection.query('INSERT INTO threadcontents set ?', data, function(error, results, fields){
      if(error == null){
        res.redirect('/thread?gn=' + guroupNo);
      }else{
        console.log(error)
      }
    });
    connection.end();
  });

  module.exports = router;
