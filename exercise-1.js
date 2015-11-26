var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : ''
    
});

connection.query("show databases", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    connection.end();
});
