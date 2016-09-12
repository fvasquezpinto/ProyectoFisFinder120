var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'fisfinder120'
});

var express = require('express');

//instanciar
var app = express();

//ruteo

app.use(express.static(__dirname + '/Views'));
app.get('/', function(req,res) {
	res.sendfile(__dirname + '/Views/index.html');
});
app.get('/about', function(req, res){
	res.sendfile(__dirname + 'Views/about.html');
});
app.use(express.static('response.write("Hola Mundo");public'));

var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

var servidor=http.createServer(function(pedido,respuesta){
    var objetourl = url.parse(pedido.url);
	var camino='views'+objetourl.pathname;
	if (camino=='views/')
		camino='views/index.html';
	encaminar(pedido,respuesta,camino);
});

servidor.listen(9000);

// De aqui en adelante se saca el resultado de la encuesta

// De aqui en adelante se realizan los procesos de interacción con el usuario a través de forms

function encaminar (pedido,respuesta,camino) {
	console.log(camino);
	switch (camino) {
		case 'views/registro': {
			registro(pedido,respuesta);
			break;
		}
		case 'views/recuperarlogin': {
			recuperarlogin(pedido,respuesta);
			break;
		}
		case 'views/eliminar_estudiante': {
			eliminar_estudiante(pedido,respuesta);
			break;
		}
		case 'views/eliminar_es': {
			eliminar_es(pedido,respuesta);
			break;
		}
		case 'views/crear_estudiante': {
			crear_estudiante(pedido,respuesta);
			break;
		}
		case 'views/crear_es': {
			crear_es(pedido,respuesta);
			break;
		}
		case 'views/modificar_estudiante': {
			modificar_estudiante(pedido,respuesta);
			break;
		}
		case 'views/modificar_es': {
			modificar_es(pedido,respuesta);
			break;
		}
		case 'views/aux_modificar_es': {
			aux_modificar_es(pedido,respuesta);
			break;
		}
		case 'views/consultar_estudiante': {
			consultar_estudiante(pedido,respuesta);
			break;
		}
		case 'views/consultar_es': {
			consultar_es(pedido,respuesta);
			break;
		}
		case 'views/salvar_encuesta': {
			salvar_encuesta(pedido,respuesta);
			break;
		}
		case 'views/encuesta': {
			encuesta(pedido,respuesta);
			break;
		}
		default : {
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
		}
	}
}


function registro(pedido,respuesta) {
	var info = '';
	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		connection.query("SELECT * FROM estudiante WHERE Email = ?", formulario['email'], function (err, rows) {
			if (err) throw err;
			if (rows.length != 0) {

				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>El usuario que intenta crear ya existe, pruebe con otro Email.</h4>' +
					'<form action="Registro.html" method="post"><input type="submit" value="Volver"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);
			}
			else{
				var datos = {
					nombre: formulario['nombre'],
					rut: formulario['rut'],
					email: formulario['email'],
					password: formulario['clave'],
					rol: formulario['rol'],
					tipo: 0
				};
				connection.query("INSERT INTO estudiante SET ?", datos)
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 0px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'Nombre de usuario:' + formulario['nombre'] + '<br>' +
					'<form action="encuesta" method="post"><input type="submit" value="Completar Encuesta">' +
					'<input type="hidden" name="email" value="'+formulario['email']+'"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);
			}
		});
	});
}

	function recuperarlogin(pedido,respuesta) {
		var info = '';
		pedido.on('data', function(datosparciales){
			info += datosparciales;
		});
		pedido.on('end', function(){
			var formulario = querystring.parse(info);

			connection.query("SELECT * FROM estudiante WHERE Email = ?", formulario['email'], function (err, rows) {
				if (err) throw err;
				if (rows.length != 0) {

					respuesta.writeHead(200, {'Content-Type': 'text/html'});
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].Password == formulario['clave']) {
							var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
								'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
								'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
								'<link rel="stylesheet" href="assets/css/main.css" />' +
								'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
								'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">' +
								'<div style="width: 300px; height: 100px;">' +
								'Bienvenido:' + formulario['email'] + '<br>' +
								'<a href="index_estudiante'+rows[i].Tipo+'.html" class="button">Ingresar a mi Plataforma</a>' +
								'</div></div></div></section>' +
								'</body></html>';
							respuesta.end(pagina);
						}
					}

				}
				else{
					connection.query("SELECT * FROM administrador WHERE Email = ?", formulario['email'], function (err, rows) {
						if (err) throw err;

						if (rows.length != 0) {
							respuesta.writeHead(200, {'Content-Type': 'text/html'});
							for (var i = 0; i < rows.length; i++) {
								if (rows[i].Password == formulario['clave']) {
									var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
										'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
										'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
										'<link rel="stylesheet" href="assets/css/main.css" />' +
										'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
										'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">' +
										'<div style="width: 300px; height: 100px;">' +
										'Bienvenido:' + formulario['email'] + '<br>' +
										'<form action="vistaadmin.html" method="post"><input type="submit" value="Ingresar a mi Plataforma"></form>' +
										'</div></div></div></section>' +
										'</body></html>';
									respuesta.end(pagina);
								}
							}
						}

						else{
							var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
								'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
								'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
								'<link rel="stylesheet" href="assets/css/main.css" />' +
								'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
								'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">' +
								'<div style="width: 300px; height: 100px;">' +
								'Usuario o contraseña incorrecta<br>' +
								'<a href="Login.html">Volver</a>' +
								'</div></div></div></section>' +
								'</body></html>';
							respuesta.end(pagina);
						}
					});
				}

			});
		});


	}


	function eliminar_estudiante(pedido,respuesta) {

		var datos = '|Nombre\t|\tRut\t|\tEmail\t|\tPassword\t|\tRol\t|\tTipo|' ;
		var info = '';

		pedido.on('data', function(datosparciales){
			info += datosparciales;
		});
		pedido.on('end', function() {
			var formulario = querystring.parse(info);
			respuesta.writeHead(200, {'Content-Type': 'text/html'});

			connection.query("SELECT * FROM estudiante", function (err, rows) {
				if (err) throw err;

				for (var i = 0; i < rows.length; i++) {
					datos += ('<h1> </h1>|' + rows[i].Nombre + '\t|\t' + rows[i].Rut + '\t|\t' + rows[i].Email + '\t|\t' +
					rows[i].Password + '\t|\t' + rows[i].Rol + '\t|\t' + rows[i].Tipo + '|');
				}
				console.log(datos);
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h3>Usuarios del sistema:\n' + '<h1> </h1>' + datos + '</h3>' + '<form action="eliminar_es" method="post">'+
					'Ingrese Email del usuario a eliminar:'+ '<input type="text" name="email_eliminar" size="30"><br>' +
					'<input type="submit" value="Eliminar Estudiante">' + '</form>' + '<br>' +
					'<a href="vistaadmin.html">Volver a mi menu</a>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			});
		});
	}

function eliminar_es(pedido,respuesta) {


	var info = '';

	pedido.on('data', function(datosparciales){
		info += datosparciales;
	});
	pedido.on('end', function() {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});

		connection.query("SELECT * FROM estudiante WHERE Email = ?", formulario['email_eliminar'], function (err, rows) {
			if (err) throw err;
			if (rows.length != 0) {

				connection.query("DELETE FROM estudiante WHERE Email = ?", formulario['email_eliminar'], function (err, rows) {
					if (err) throw err;
					var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
						'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
						'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
						'<link rel="stylesheet" href="assets/css/main.css" />' +
						'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
						'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">' +
						'<div style="width: 300px; height: 100px;">' +
						'Usuario eliminado' + '<br>' + '<a href="vistaadmin.html">Volver a mi menu</a>' + '</body></html>' +
						'</div></div></div></section>' +
						'</body></html>';
					respuesta.end(pagina);

					console.log('sipase')

				});
			}
			else {
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>El usuario que intenta eliminar no existe, ingrese Email nuevamente.</h4>' +
					'<form action="eliminar_estudiante" method="post"><input type="submit" value="Volver"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);
			}
		});
	});
}

function crear_estudiante(pedido,respuesta) {
	var info = '';
	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
			'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
			'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
			'<link rel="stylesheet" href="assets/css/main.css" />' +
			'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
			'<section id="banner"><div class="align-center"><div style="margin: 0px 100px 100px 489px">'+
			'<div style="width: 300px; height: 200px;">' +

			'<form action="crear_es" method="post">' +
			'Nombre:' +
			'<input type="text" name="nombre" size="30"><br>' +
			'Rut:' +
			'<input type="text" name="rut" size="30"><br>' +
			'Email:'+
			'<input type="text" name="email" size="30"><br>'+
			'Clave:'+
			'<input type="password" name="clave" size="30"><br>'+
			'Rol:'+
			'<input type="text" name="rol" size="30"><br>' +

			'<input type="submit" value="Crear Estudiante">' + '</form>' +
			'<a href="vistaadmin.html">Volver a mi menu</a>' +
			'</div></div></div></section>' + '<br>' +
			'</body></html>';
		respuesta.end(pagina);

	});
}

function crear_es(pedido,respuesta) {
	var info = '';

	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		connection.query("SELECT * FROM estudiante WHERE Email = ?",formulario['email'],function(err,rows) {
			if (err) throw err;
			if (rows.length != 0){
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>El usuario que intenta crear ya existe, pruebe con otro Email.</h4>' +
					'<form action="crear_estudiante" method="post"><input type="submit" value="Volver"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			}
			else{
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'Usuario Creado' + '<h1> </h1>' + '<a href="vistaadmin.html">Volver a mi menu</a>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

				var datos = {
					nombre: formulario['nombre'],
					rut: formulario['rut'],
					email: formulario['email'],
					password: formulario['clave'],
					rol: formulario['rol'],
					tipo: 0
				};

				connection.query("INSERT INTO estudiante SET ?", datos);
			}
		});

	});
}

function modificar_estudiante(pedido,respuesta) {
	var info = '';
	var datos = '|Nombre\t|\tRut\t|\tEmail\t|\tPassword\t|\tRol\t|\tTipo\t|\t';
	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		respuesta.writeHead(200, {'Content-Type': 'text/html'});

		connection.query("SELECT * FROM estudiante", function (err, rows) {
			if (err) throw err;

			for (var i = 0; i < rows.length; i++) {
				datos += ('<h1> </h1>' + '\t|\t' + rows[i].Nombre + '\t|\t' + rows[i].Rut + '\t|\t' + rows[i].Email + '\t|\t' +
				rows[i].Password + '\t|\t' + rows[i].Rol + '\t|\t' + rows[i].Tipo + '|');
			}
			var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
				'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
				'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
				'<link rel="stylesheet" href="assets/css/main.css" />' +
				'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
				'<section id="banner"><div class="align-center"><div style="margin: 0px 100px 100px 489px">'+
				'<div style="width: 300px; height: 200px;">'+ '<h3>Usuarios del sistema:\n' + '<h1> </h1>' + datos + '</h3>' +
				'<h1> </h1>' + '<h4> Ingrese el email del usuario que desea modifcar: </h4>' +

				'<form action="modificar_es" method="post"><input type="text" name="email">' + '' + '<h1> </h1>' +
				'<h1> </h1>' +

				'<h4> Seleccione el dato que desea modifcar: </h4>' +
				'<SELECT name="parametro" size="10" class="button special">'+
				'<OPTION VALUE="clave" selected>Clave</OPTION>'+
				'<OPTION VALUE="tipo">Tipo</OPTION>'+
				'</SELECT>'+

				'<h1> </h1>' +
				'<input type="submit" value="Modificar"></form>'+

				'<a href="vistaadmin.html">' + '<h1> </h1>' + 'Volver a mi menu</a>' +
				'</div></div></div></section>' + '<br>' +
				'</body></html>';
			respuesta.end(pagina);
		});


	});
}

function modificar_es(pedido,respuesta) {
	var info = '';

	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		connection.query("SELECT * FROM estudiante WHERE Email = ?",formulario['email'],function(err,rows) {
			if (err) throw err;
			if (rows.length == 0){
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>El usuario que intenta modificar no existe, ingrese Email nuevamente.</h4>' +
					'<form action="modificar_estudiante" method="post"><input type="submit" value="Volver"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			}
			else{
				if (formulario['parametro']=='clave'){
					var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
						'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
						'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
						'<link rel="stylesheet" href="assets/css/main.css" />' +
						'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
						'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
						'<div style="width: 300px; height: 100px;">' +
						'<form action="aux_modificar_es" method="post">' +
						'Nueva Clave:'+
						'<input type="password" name="clave" size="30"><br>'+
						'<input type="hidden" name="parametro" value="clave" size="30"><br>'+
						'<input type="hidden" name="email" value="' + formulario['email'] + '" size="30"><br>'+
						'<input type="submit" value="Modificar Clave de Estudiante">' + '</form>'+
						'<a href="vistaadmin.html">Volver a mi menu</a>' +
						'</div></div></div></section>' +
						'</body></html>';
					respuesta.end(pagina);

				}
				else{
					var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
						'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
						'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
						'<link rel="stylesheet" href="assets/css/main.css" />' +
						'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
						'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
						'<div style="width: 300px; height: 100px;">' +
						'<form action="aux_modificar_es" method="post">' +
						'Nuevo Tipo:'+
						'<input type="text" name="nuevo_tipo" size="1"><br>'+
						'<input type="hidden" name="parametro" value="tipo" size="30"><br>'+
						'<input type="hidden" name="email" value="' + formulario['email'] +'" size="30"><br>'+
						'<input type="submit" value="Modificar Tipo de Estudiante">' + '</form>'+
						'<a href="vistaadmin.html">Volver a mi menu</a>' +
						'</div></div></div></section>' +
						'</body></html>';
					respuesta.end(pagina);

				}

			}
		});

	});
}

function aux_modificar_es(pedido,respuesta) {
	var info = '';

	pedido.on('data', function (datosparciales) {
		info += datosparciales;
	});
	pedido.on('end', function () {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
			if (formulario['parametro'] == 'clave'){
				connection.query("UPDATE estudiante SET Password=? WHERE Email = ?", [formulario['clave'],formulario['email']]);
				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>Clave de estudiante modificada con éxito.</h4>' +
					'<a href="vistaadmin.html">Volver a mi menu</a>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			}
			else{
				console.log('asdasfadsfadsfasf');
				console.log(formulario['email']);

				connection.query("UPDATE estudiante SET Tipo=? WHERE Email = ?", [formulario['nuevo_tipo'],formulario['email']]);

				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>Tipo de estudiante modificado con éxito.</h4>' +
					'<a href="vistaadmin.html">Volver a mi menu</a>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);


			}

	});
}

function consultar_estudiante(pedido,respuesta) {

	var info = '';
	pedido.on('data', function(datosparciales){
		info += datosparciales;
	});
	pedido.on('end', function(){
		respuesta.writeHead(200, {'Content-Type': 'text/html'});

		var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
		'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
		'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
		'<link rel="stylesheet" href="assets/css/main.css" />' +
		'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
		'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
		'<div style="width: 300px; height: 100px;">' +
		'<h4>Usuarios del sistema:\n' + '<h1> </h1>' + '</h4>' + '<form action="consultar_es" method="post">'+
		'Ingrese Email del estudiante que desea consultar:'+ '<input type="text" name="email" size="30"><br>' +
		'<input type="submit" value="Consultar Estudiante">' + '</form>' + '<br>' +
		'<a href="vistaadmin.html">Volver a mi menu</a>' +
		'</div></div></div></section>' +
		'</body></html>';
		respuesta.end(pagina);
		});

}

function consultar_es(pedido,respuesta) {

	var info = '';
	pedido.on('data', function(datosparciales){
		info += datosparciales;
	});
	pedido.on('end', function(){
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		connection.query("SELECT * FROM estudiante WHERE Email = ?",formulario['email'],function(err,rows) {
			if (err) throw err;
			if (rows.length == 0){

				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h1>El Email consultado no existe en el sistema, ingrese Email nuevamente.</h1>' +
					'<form action="consultar_estudiante" method="post"><input type="submit" value="Volver"></form>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			}
			else{

				var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">'+
					'<div style="width: 300px; height: 100px;">' +
					'<h4>Datos del Usuario:</h4>' +
					'Nombre\t|\tRut\t|\tEmail\t|\tPassword\t|\tRol\t|\tTipo\t|\t'+
					'<h1> </h1>' + rows[0].Nombre + '\t|\t' + rows[0].Rut + '\t|\t' + rows[0].Email + '\t|\t' +
					rows[0].Password + '\t|\t' + rows[0].Rol + '\t|\t' + rows[0].Tipo	+
					'<h1> </h1>'+
					'<a href="vistaadmin.html">Volver a mi menu</a>' +
					'</div></div></div></section>' +
					'</body></html>';
				respuesta.end(pagina);

			}
		});
	});

}


function salvar_encuesta(pedido,respuesta) {

	var info = '';
	pedido.on('data', function(datosparciales){
		info += datosparciales;
	});
	pedido.on('end', function(){
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var formulario = querystring.parse(info);
		var EC = parseInt(formulario["1a"], 10) + parseInt(formulario["2a"], 10) + parseInt(formulario["3a"], 10) + parseInt(formulario["4a"], 10) + parseInt(formulario["5a"], 10) + parseInt(formulario["6a"], 10) + parseInt(formulario["7a"], 10) + parseInt(formulario["8a"], 10) + parseInt(formulario["9a"], 10) + parseInt(formulario["10a"], 10) + parseInt(formulario["11a"], 10) + parseInt(formulario["12a"], 10);
		var OR = parseInt(formulario["1b"], 10) + parseInt(formulario["2b"], 10) + parseInt(formulario["3b"], 10) + parseInt(formulario["4b"], 10) + parseInt(formulario["5b"], 10) + parseInt(formulario["6b"], 10) + parseInt(formulario["7b"], 10) + parseInt(formulario["8b"], 10) + parseInt(formulario["9b"], 10) + parseInt(formulario["10b"], 10) + parseInt(formulario["11b"], 10) + parseInt(formulario["12b"], 10);
		var CA = parseInt(formulario["1c"], 10) + parseInt(formulario["2c"], 10) + parseInt(formulario["3c"], 10) + parseInt(formulario["4c"], 10) + parseInt(formulario["5c"], 10) + parseInt(formulario["6c"], 10) + parseInt(formulario["7c"], 10) + parseInt(formulario["8c"], 10) + parseInt(formulario["9c"], 10) + parseInt(formulario["10c"], 10) + parseInt(formulario["11c"], 10) + parseInt(formulario["12c"], 10);
		var EA = parseInt(formulario["1d"], 10) + parseInt(formulario["2d"], 10) + parseInt(formulario["3d"], 10) + parseInt(formulario["4d"], 10) + parseInt(formulario["5d"], 10) + parseInt(formulario["6d"], 10) + parseInt(formulario["7d"], 10) + parseInt(formulario["8d"], 10) + parseInt(formulario["9d"], 10) + parseInt(formulario["10d"], 10) + parseInt(formulario["11d"], 10) + parseInt(formulario["12d"], 10);
		console.log(EC);
		console.log(OR);
		console.log(CA);
		console.log(EA);

		var CAEC = CA - EC;
		var EAOR = EA - OR;
		console.log(CAEC);
		console.log(EAOR);
		if(CAEC <=3 && EAOR >=6){
			connection.query("UPDATE estudiante SET Tipo = 2 WHERE Email = ?", formulario['email']);
		}
		else if(CAEC >3 && EAOR >=6){
			connection.query("UPDATE estudiante SET Tipo = 0 WHERE Email = ?", formulario['email']);
		}
		else if(CAEC <= 3 && EAOR < 6){
			connection.query("UPDATE estudiante SET Tipo = 1 WHERE Email = ?", formulario['email']);
		}
		else if (CAEC >3 && EAOR < 6) {
			connection.query("UPDATE estudiante SET Tipo = 3 WHERE Email = ?", formulario['email']);
		}

		connection.query("SELECT * FROM estudiante WHERE Email = ?", formulario['email'], function (err, rows) {
			if (err) throw err;
			if (rows.length != 0) {

				respuesta.writeHead(200, {'Content-Type': 'text/html'});
				for (var i = 0; i < rows.length; i++) {
					var pagina = '<!doctype html><html><head><title>FisFinder120 Home</title><meta charset="utf-8" />' +
					'<meta name="viewport" content="width=device-width, initial-scale=1" />' +
					'<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->' +
					'<link rel="stylesheet" href="assets/css/main.css" />' +
					'<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--></head><body>' +
					'<section id="banner"><div class="align-center"><div style="margin: 60px 100px 100px 489px">' +
					'<div style="width: 300px; height: 100px;">' +
					'Bienvenido:' + formulario['email'] + '<br>' +
					'<a href="index_estudiante'+rows[i].Tipo+'.html" class="button">Ingresar a mi Plataforma</a>' +
					'</div></div></div></section>' +
					'</body></html>';
					respuesta.end(pagina);
				}
			}
		});
	});

}

function encuesta(pedido,respuesta) {

	var info = '';
	pedido.on('data', function(datosparciales){
		info += datosparciales;
	});
	pedido.on('end', function() {
		var formulario = querystring.parse(info);
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var pagina =
			'<!DOCTYPE HTML> <!--Alpha by HTML5 UPhtml5up.net | @ajlknFree for personal and commercial use under the CCA 3.0 license (html5up.net/license)--> <html> <head> <title>Encuesta</title> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1" /> <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]--> <link rel="stylesheet" href="assets/css/main.css" /> <!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]--> </head> <body class="landing" style="background-color: #e5cb95"> <div id="page-wrapper" >'+
			'<!-- Header --> <header id="header" class="alt"> <h1>Registro de Estudiante: Encuesta - FisFinder120</h1> <nav id="nav"> <ul> <li><a href="index.html">Home</a></li> <li> </ul> </nav> </header> <!-- Banner --> <section id="banner"> <h2>FisFinder120</h2> </section> <!-- Main --> <!-- CTA --> <header> <h2>Encuesta</h2> </header> <section style="background-color: #e5cb95"> <h3>Instrucciones</h3> <p> <b>Se te pide que completes 12 frases. <ul> <li>Cada frase puede terminarse de cuatro formas distintas.</li><br> <li>Ordena las cuatro opciones de cada frase según pienses que se ajustan a tu manera de aprender algo nuevo.</li><br> <li>Trata de pensar en situaciones recientes en las que te enfrentaste con algo nuevo.</li><br> <li>Numera con un 4 la terminación que mejor se ajuste a tu forma de aprender y con un 1 la que peor se ajuste.</li><br> <li>Asegúrate de asignar un número a todas las terminaciones de cada una de las 12 frases.</li><br> </ul> </b> </p> </section> <div class="align-left" > <div style="margin: 60px auto auto 100px" > <div style="width: 300px; height: 100px;"> <article style="background-color: #e5cb95"> <form action="salvar_encuesta" method="post"> <br> <fieldset> <h3>Cuando aprendo...</h3>Me gusta vivir sensaciones <select  name="1a"> <option value="">Selecciona una opcion</option> <option value="1">1</option><option value="2">2</option>'+
			'<option value="3">3</option> <option value="4">4</option> </select><p>Me gusta pensar sobre ideas <select name="1b"> <option value="">Selecciona una opcion</option> <option value="1">1</option><option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me gusta estar haciendo cosas <select name="1c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me gusta observar y escuchar <select name="1d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Aprendo mejor cuando...</h3>Escucho y observo cuidadosamente <select name="2a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Confio en el pensamiento logico <select name="2b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Confio en mi intuicion y sentimientos <select name="2c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Trabajo duro para lograr hacer las cosas <select name="2d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Cuando estoy aprendiendo...</h3>Tiendo a usar el razomaniento <select name="3a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Soy responsable con lo que hago <select name="3b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Soy callado y reservado'+
			'<select name="3c"> <option value="">Selecciona una opcion</option>> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Tengo fuertes sensaciones y reacciones <select name="3d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Yo aprendo...</h3>Sintiendo <select name="4a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Haciendo <select name="4b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Observando <select name="4c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Pensando <select name="4d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p></fieldset>'+
			'<br><fieldset><h3>Cuando aprendo...</h3>Estoy abierto a nuevas experiencias <select name="5a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Observo todos los aspectos del asunto <select name="5b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me gusta analizar las cosas, descomponerlas en sus partes <select name="5c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me gusta probar e intentar hacer las cosas <select name="5d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Cuando estoy aprendiendo...</h3>Soy una persona observadora <select name="6a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Soy una persona activa<select name="6b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy una persona intuitiva <select name="6c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy una persona logica <select name="6d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Yo aprendo mejor de...</h3>La observacion <select name="7a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> La relacion con otras personas <select name="7b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Las teorias racionales <select name="7c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>La oportunidad de probar y practicar <select name="7d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Cuando aprendo...</h3> Me gusta ver los resultados de mi trabajo <select name="8a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Me gusta las ideas y las teorias <select name="8b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me tomo mi tiempo antes de actuar <select name="8c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p>Me siento personalmente involucrado en las cosas <select name="8d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Aprendo mejor cuando...</h3> Confio en mis observaciones <select name="9a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Confio en mis sentimientos <select name="9b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Puedo probar por mi cuenta <select name="9c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Confio en mis ideas <select name="9d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Cuando estoy aprendiendo...</h3> Soy una persona reservada <select name="10a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy una persona receptiva <select name="10b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy una persona responsable <select name="10c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy una persona racional <select name="10d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Cuando aprendo...</h3> Me involucro <select name="11a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Me gusta observar <select name="11b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Evaluo las cosas <select name="11c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Me gusta ser activo <select name="11d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <br> <fieldset> <h3>Aprendo mejor cuando...</h3> Analizo ideas <select name="12a"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy receptivo y abierto <select name="12b"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy cuidadoso <select name="12c"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> Soy practico <select name="12d"> <option value="">Selecciona una opcion</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select><p> </fieldset> <input type="hidden" name="email" value="'+formulario['email']+'"> <br><input type="submit" onclick = "asignarTipoEstudiante('+formulario['email']+',sumarRespuestas(window.location.href))" value="Enviar" ></br> <footer>Todos los derechos reservados. </footer> </form>> </article> </div> </div> </div><br> <!-- Footer --> </div> <!-- Scripts --> <script src="assets/js/jquery.min.js"></script> <script src="assets/js/jquery.dropotron.min.js"></script> <script src="assets/js/jquery.scrollgress.min.js"></script> <script src="assets/js/skel.min.js"></script> <script src="assets/js/util.js"></script> <script src="assets/js/index.js"></script> <script src="../server.js"></script> <!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]--> <script src="assets/js/main.js"></script> </body> </html>';
		respuesta.end(pagina);
	});
}

console.log('Servidor web iniciado');