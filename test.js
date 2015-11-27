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
        var objAdr = {
            entries: []
        };
        var objEnt = {};
        var currentAct;
        var currentAdr;
        var foundAct = false;
        var foundAdr = false;

        //accounts
        for (var j = 0; j < array.length; j++) {
            if (array.length > 0) {
                if (rows[i].actId === array[j].actId) {
                    currentAct = j;
                    foundAct = true;
                }
            }
        }

        if (!foundAct) {
            objAct.actId = rows[i].actId;
            objAct.actEmail = rows[i].actEmail;
            array.push(objAct);
            currentAct = array.length - 1;
        }
        //addressbooks
        for (var count = 0; count < array[currentAct].addressBooks.length; count++) {
            if (array[currentAct].addressBooks[count].adrId === rows[i].adrId) {
                foundAdr = true;
                currentAdr = array[currentAct].addressBooks.length - 1;
            }
        }
        if (!foundAdr) {
            objAdr.adrId = rows[i].adrId;
            objAdr.adrName = rows[i].adrName;
            array[currentAct].addressBooks.push(objAdr);
            currentAdr = array[currentAct].addressBooks.length - 1;
        }
        //entries
        objEnt.id = rows[i].entId;
        objEnt.first = rows[i].first;
        objEnt.last = rows[i].last;
        array[currentAct].addressBooks[currentAdr].entries.push(objEnt);





    }

    console.log(array[1].addressBooks[0]);
    connection.end();
});