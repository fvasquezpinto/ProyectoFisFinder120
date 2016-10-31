/**
 * Module dependencies.
 */

//Prueba de MYSQL


var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fisfinder120"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

con.query('SELECT * FROM estudiante',function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
        console.log(rows[i].Email);
        $data=(rows[i],Email);
    }

});

con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});

