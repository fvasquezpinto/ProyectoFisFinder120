//importar
var express = require('express');

//instanciar
var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'fisfinder120'
});

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function sumarRespuestas(url){
    var respuestas = parseURLParams(url);
    var EC = parseInt(respuestas["1a"], 10) + parseInt(respuestas["2a"], 10) + parseInt(respuestas["3a"], 10) + parseInt(respuestas["4a"], 10) + parseInt(respuestas["5a"], 10) + parseInt(respuestas["6a"], 10) + parseInt(respuestas["7a"], 10) + parseInt(respuestas["8a"], 10) + parseInt(respuestas["9a"], 10) + parseInt(respuestas["10a"], 10) + parseInt(respuestas["11a"], 10) + parseInt(respuestas["12a"], 10);
    var OR = parseInt(respuestas["1b"], 10) + parseInt(respuestas["2b"], 10) + parseInt(respuestas["3b"], 10) + parseInt(respuestas["4b"], 10) + parseInt(respuestas["5b"], 10) + parseInt(respuestas["6b"], 10) + parseInt(respuestas["7b"], 10) + parseInt(respuestas["8b"], 10) + parseInt(respuestas["9b"], 10) + parseInt(respuestas["10b"], 10) + parseInt(respuestas["11b"], 10) + parseInt(respuestas["12b"], 10);
    var CA = parseInt(respuestas["1c"], 10) + parseInt(respuestas["2c"], 10) + parseInt(respuestas["3c"], 10) + parseInt(respuestas["4c"], 10) + parseInt(respuestas["5c"], 10) + parseInt(respuestas["6c"], 10) + parseInt(respuestas["7c"], 10) + parseInt(respuestas["8c"], 10) + parseInt(respuestas["9c"], 10) + parseInt(respuestas["10c"], 10) + parseInt(respuestas["11c"], 10) + parseInt(respuestas["12c"], 10);
    var EA = parseInt(respuestas["1d"], 10) + parseInt(respuestas["2d"], 10) + parseInt(respuestas["3d"], 10) + parseInt(respuestas["4d"], 10) + parseInt(respuestas["5d"], 10) + parseInt(respuestas["6d"], 10) + parseInt(respuestas["7d"], 10) + parseInt(respuestas["8d"], 10) + parseInt(respuestas["9d"], 10) + parseInt(respuestas["10d"], 10) + parseInt(respuestas["11d"], 10) + parseInt(respuestas["12d"], 10);

    var CAEC = CA - EC;
    var EAOR = EA - OR;

    if(CAEC <=3 && EAOR >=6){
        return "Adaptador";
    }
    else if(CAEC >3 && EAOR >=6){
        return "Convergente";
    }
    else if(CAEC <= 3 && EAOR < 6){
        return "Divergente";
    }
    else if (CAEC >3 && EAOR < 6) {
        return "Asimilador";
    }
}

function asignarTipoEstudiante(mail, tipo){
    console.log('iadhkaslhdkadshfjdssssssssssssssssssssssssb dskjab fkadbs f,mawebñfnaerwklfnkafjsnhkfnhasdfsadfasffsaddsf');
    if(tipo == "Convergente"){
        connection.query("UPDATE estudiante SET Tipo = 0 WHERE Email = ?", mail);
    }
    else if(tipo == "Divergente"){
        connection.query("UPDATE estudiante SET Tipo = 1 WHERE Email = ?", mail);
    }
    else if(tipo == "Adaptador"){
        connection.query("UPDATE estudiante SET Tipo = 2 WHERE Email = ?", mail);
    }
    else if(tipo == "Asimilador") {
        connection.query("UPDATE estudiante SET Tipo = 3 WHERE Email = ?", mail);
    }
}

asignarTipoEstudiante('1212',"Adaptador");

connection.end();

