var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'fisfinder120'
});

connection.connect();

connection.query("INSERT INTO estudiante (Nombre,Rut,Email,Password,Rol,Tipo) VALUES ('Francisco','19133993-2','a@e.i','papa','201473568-5',0)");

connection.end();