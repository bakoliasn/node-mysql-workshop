var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

connection.query("select Account.email, AddressBook.name from AddressBook join Account on AddressBook.accountId=Account.id", function(err, rows) {
    if (err) throw err;
    var arr = [];

    for (var i = 0; i < rows.length; i++) {
        var obj = {
            books: []
        };
        var current;
        var found = false;
        for (var j = 0; j < arr.length; j++) {
            if (rows[i].Account.email === arr[j].email) {
                found = true;
                current = j;
            }
        }
        if (found) {
            arr[j].books.push(rows[i].AddessBook.name);
        } else {
            obj.email = rows[i].Account.email;
            obj.books.push(rows[i].AddressBook.name);
        }

    }

    console.log(arr);
});
