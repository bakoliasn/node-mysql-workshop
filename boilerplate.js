var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.IP,
  user: process.env.C9_USER,
  password: '',
  database: 'addressbook'
});

connection.query("SELECT Account.id AS actId, Account.email AS actEmail, AddressBook.id AS adrId, AddressBook.accountId AS adrActId, AddressBook.name AS adrName, Entry.id AS entId, Entry.addressbookId AS entAdrId, Entry.firstName AS first, Entry.lastName AS last FROM Account JOIN AddressBook ON Account.id=AddressBook.accountId JOIN Entry ON Entry.addressbookId=AddressBook.id", function(err, rows) {
  if (err) throw err;

  var array = [];
  var objAct = {
    addressBooks: []
  };
  var objAdrBook = {
    entries: []
  };

  for (var i = 0; i < rows.length; i++) {
    
    var push
    
    var foundAct = false;
    var currentAct;
    var foundAdr = false;
    var currentAdr;
    for (var j = 0; j < rows.length; j++) {
      if (rows[i].actId === array[j].actId) {
        foundAct = true;
        currentAct = j;
      }
      for (var k = 0; k < array[j].addressBooks.length; k++) {
        if (rows[i].adrId === array[j].addressBooks[k]) {
          foundAdr = true;
          currentAdr = k;
        }
      }
    }
    if(!foundAct){
      objAct.actId = rows[i].actId;
      objAct.actEmail = rows[i].actEmail;
      array.push(objAct)
      currentAct = array.length -1;
    }
    if(!foundAdr){
      objAdrBook.adrId = rows[i].adrId;
      objAdrBook.
    }
    
    
  }
});
