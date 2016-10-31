/*
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'fisfinder120'
});
*/

var express = require('express');

//instanciar
var app = express();

//ruteo

app.use(express.static(__dirname + '/app'));
app.get('/', function(req,res) {
	res.sendfile(__dirname + '/app/index.html');
});
app.get('/about', function(req, res){
	res.sendfile(__dirname + 'app/index-async.html');
});
app.use(express.static('response.write("Hola Mundo");public'));

app.listen(9000);

console.log('Servidor web iniciado');