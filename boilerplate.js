var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.IP,
  user: process.env.C9_USER,
  password: '',
  database: 'addressbook'
});

connection.query("select Account.id as ActId, AddressBook.accountId as AdsId, Account.email as AccountEmail, AddressBook.name as AddressBookName FROM Account left join AddressBook on Account.id=AddressBook.accountId", function(err, rows) {
  if (err) throw err;
  var arr = [];

  for (var i = 0; i < rows.length; i++) {
    var counter = 0;
    var obj = {
      books: []
    };
    var current;
    for (var j = 0; j < arr.length; j++) {
      if (rows[i].ActId === arr[j].ActId) {
        counter++;
        current = j;
      }
    }
    if (counter < 1) {
      obj.ActId = rows[i].ActId;
      obj.AccountEmail = rows[i].AccountEmail;
      obj.books.push(rows[i].AddressBookName);
      arr.push(obj);
    }
    else {
      arr[current].books.push(rows[i].AddressBookName);
    }
  }
  for(var k = 0; k < arr.length; k++){
    var a = "#" + arr[k].ActId + " " + arr[k].AccountEmail + "\n" + arr[k].books.join(", ") + "\n --------";
    var b = "#" + arr[k].ActId + " " + arr[k].AccountEmail + "\n" + "---NO ADDRESSBOOKS---" + "\n --------";
    if(arr[k].books[0] === null){
      console.log(b);
    }else{
      console.log(a);
    }
  }
  connection.end();
});