var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/quotes', function(req, res, next) {
  
    const nameFilter = req.query.name;
  
    var connection = mysql.createConnection({
      host     : 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user     : 'ds0xc2vmvbxi1e5j',
      password : 'jke8m8nmv7y3hnq7',
      database : 'skzjmcjkossn3dap'
    });

    connection.connect();

    connection.query(`
      SELECT q.*, CONCAT(a.firstName, ' ', a.lastName) AS 'fullName', a.sex AS 'gender'
      FROM l9_quotes q INNER JOIN
      l9_author a ON q.authorId = a.authorId
      WHERE a.firstName LIKE '${nameFilter}'
      `, 
      function(error, results, fields) {
            if (error) throw error;
            console.log('The quotes are: ', results);

            res.render('../public/labs/lab9/view', {
                title: 'Lab 9',
                quotes: results
            });
        });
      
    connection.end();
});

module.exports = router;
