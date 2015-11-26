var mysql = require('mysql');
var color = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});
connection.query("SELECT email FROM Account LIMIT 5", function(err, rows) {
    if(err) throw err;
    for(var i = 0; i < rows.length; i++){
    console.log(rows[i].email);

      
    }
  connection.end();
});
