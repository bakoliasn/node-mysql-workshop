var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

connection.query("SELECT Account.id AS actId, Account.email AS actEmail, AddressBook.id AS adrId, AddressBook.accountId AS adrActId, AddressBook.name AS adrName, Entry.id AS entId, Entry.addressbookId AS entAdrId, Entry.firstName AS first, Entry.lastName AS last, Address.id AS addressId, Address.type AS adrType, Address.line1 AS adrLine1, Address.line2 AS adrLine2, Address.city AS adrCity, Address.state AS adrState, Address.zip AS adrZip, Address.country AS adrCountry, Phone.id AS phoneId, Phone.type AS phoneType, Phone.subtype AS phoneSubtype, Phone.phoneNumber AS phoneNumber, Email.id AS emailId, Email.type as emailType, Email.address as emailAddress FROM Account LEFT JOIN AddressBook ON Account.id=AddressBook.accountId LEFT JOIN Entry ON Entry.addressbookId=AddressBook.id LEFT JOIN Address ON Entry.id=Address.entryId LEFT JOIN Phone ON Phone.entryId=Entry.id LEFT JOIN Email ON Email.entryId=Entry.id", function(err, rows) {
    if (err) throw err;

    var array = [];



    for (var i = 0; i < rows.length; i++) {
        var objAct = {
            addressBooks: []
        };
        var objAdr = {
            entries: []
        };
        var objEnt = {email:[],phone:[],address:[]};
        var objAdrEnt = {};
        var objPhone = {};
        var objEmail = {};
        var currentAct;
        var currentAdr;
        var currentEnt;
        var foundAct = false;
        var foundAdr = false;
        var foundEnt = false;

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
        
        
        for (var counter = 0; counter < array[currentAct].addressBooks[currentAdr].entries.length; counter++) {
                if(array[currentAct].addressBooks[currentAdr].entries.id===rows[i].entId){
                    foundEnt = true;
                    currentEnt = counter;
                }
        }
        if(!foundEnt){
        objEnt.id = rows[i].entId;
        objEnt.first = rows[i].first;
        objEnt.last = rows[i].last;
        array[currentAct].addressBooks[currentAdr].entries.push(objEnt);
        currentEnt = array[currentAct].addressBooks[currentAdr].entries.length -1;
        }

        //Address
        objAdrEnt.id = rows[i].addressId;
        objAdrEnt.type = rows[i].adrType;
        objAdrEnt.line1 = rows[i].adrLine1;
        objAdrEnt.line2 = rows[i].adrLine2;
        objAdrEnt.city = rows[i].adrCity;
        objAdrEnt.state = rows[i].adrState;
        objAdrEnt.zip = rows[i].adrZip;
        objAdrEnt.country = rows[i].adrCountry;
        array[currentAct].addressBooks[currentAdr].entries[currentEnt].address.push(objAdrEnt);
        //Phone
        objPhone.id = rows[i].phoneId;
        objPhone.type = rows[i].phoneType;
        objPhone.subtype = rows[i].phoneSubtype;
        objPhone.number = rows[i].phoneNumber;
        array[currentAct].addressBooks[currentAdr].entries[currentEnt].phone.push(objPhone);
        //Email
        objEmail.id = rows[i].emailId;
        objEmail.type = rows[i].emailType;
        objEmail.Address = rows[i].emailAddress;
        array[currentAct].addressBooks[currentAdr].entries[currentEnt].email.push(objEmail);

        




    }

    console.log(array[1].addressBooks[0].entries[0]);
    connection.end();
});