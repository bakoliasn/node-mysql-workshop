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


  for (var i = 0; i < rows.length; i++) {

    var objAct = {
      addressBooks: []
    };
    var objAdrBook = {
      entries: []
    };


    var foundAct = false;
    var currentAct;
    var foundAdr = false;
    var currentAdr;

    for (var j = 0; j < array.length; j++) {
      if (array[0] !== null) {
        if (rows[i].actId === array[j].actId) {
          foundAct = true;
          currentAct = j;
        }
      }
    }
    if (!foundAct) {
      objAct.actId = rows[i].actId;
      objAct.actEmail = rows[i].actEmail;
      array.push(objAct);
      currentAct = array.length - 1;
    }

    for (var k = 0; k < array[currentAct].addressBooks.length; k++) {
      if (array[currentAct].addressBooks[0] !== null) {
        if (rows[i].adrId === array[currentAct].addressBooks[k] && rows[i].actId === array[j].actId) {
          foundAdr = true;
          currentAdr = k;
        }
      }
    }

  
    if (!foundAdr) {
      objAdrBook.adrId = rows[i].adrId;
      objAdrBook.adrName = rows[i].adrName;
      array[currentAct].addressBooks.push(objAdrBook);
      currentAdr = array[currentAct].addressBooks.length - 1;
    }
    array[currentAct].addressBooks[currentAdr].entries.push({
      id: rows[i].entId,
      firstName: rows[i].firstName,
      lastName: rows[i].lastName
    });

  }
  for (var x = 0; x < array.length; x++){
  console.log(array[i].addressBook);
  }
  connection.end();
});
