var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'fisfinder120'
});

connection.connect();

connection.query("SELECT * FROM estudiante",function(err,rows) {

    if (err) throw err;

    for (var i = 0; i < rows.length; i++) {
        console.log(rows[i].Nombre);
    }

});


connection.end();