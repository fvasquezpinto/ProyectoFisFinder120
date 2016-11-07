var nombre = '';
var rut = '';
var password = '';
var mail = '';
var tipo = '';
var admin= '';

var ang = angular.module("controller", []);

    ang.controller('RegistroCtrl', function ($scope, $http, $log, $window) {
        //$scope.Registrarse = "Registrarse";
        $scope.submit = function () {
            var datax = $.param({
                nombre: $scope.nuevoNombre,
                rut: $scope.nuevoRut,
                email: $scope.nuevoEmail,
                rol: $scope.nuevoRol,
                clave: $scope.nuevoPassword
            });
            $http.post('views/registro2', datax)
                .success(function (data) {
                    mail = data;
                    if( mail != "NO"){
                        $http.post('views/obtener_nombre', datax)
                            .success(function (data) {
                                nombre = data;
                                //$scope.Registrarse = paso;
                                $window.location.href = '#Test';
                            })
                            .error(function (err) {
                                $log.error(err);
                            });
                    }
                    //$scope.Registrarse = paso;
                })
                .error(function (err) {
                    $log.error(err);
                });


            //dato = $http.get("views/registro2", data);
            console.log('Data posted successfully');
        };

    });


    ang.controller('TestCtrl', function ($scope, $http, $log, $window) {
        $scope.Usuario = "Bienvenido " + nombre;
        $scope.submitt = function () {
           $scope.Usuario = nombre;
            var datax = $.param({

                email: mail,

                va1: $scope.a1,
                vb1: $scope.b1,
                vc1: $scope.c1,
                vd1: $scope.d1,

                va2: $scope.a2,
                vb2: $scope.b2,
                vc2: $scope.c2,
                vd2: $scope.d2,

                va3: $scope.a3,
                vb3: $scope.b3,
                vc3: $scope.c3,
                vd3: $scope.d3,

                va4: $scope.a4,
                vb4: $scope.b4,
                vc4: $scope.c4,
                vd4: $scope.d4,

                va5: $scope.a5,
                vb5: $scope.b5,
                vc5: $scope.c5,
                vd5: $scope.d5,

                va6: $scope.a6,
                vb6: $scope.b6,
                vc6: $scope.c6,
                vd6: $scope.d6,

                va7: $scope.a7,
                vb7: $scope.b7,
                vc7: $scope.c7,
                vd7: $scope.d7,

                va8: $scope.a8,
                vb8: $scope.b8,
                vc8: $scope.c8,
                vd8: $scope.d8,

                va9: $scope.a9,
                vb9: $scope.b9,
                vc9: $scope.c9,
                vd9: $scope.d9,

                va10: $scope.a10,
                vb10: $scope.b10,
                vc10: $scope.c10,
                vd10: $scope.d10,

                va11: $scope.a11,
                vb11: $scope.b11,
                vc11: $scope.c11,
                vd11: $scope.d11,

                va12: $scope.a12,
                vb12: $scope.b12,
                vc12: $scope.c12,
                vd12: $scope.d12

            });

            $http.post('views/salvar_encuesta', datax)
                .success(function (data) {
                    tipo = data;
                    //$scope.Registrarse = paso;
                    $window.location.href = '#a';
                })
                .error(function (err) {
                    $log.error(err);
                });
        };

    });

ang.controller('HomeCtrl', function ($scope, $http, $log, $window) {


    $scope.login = function () {
        var datax = $.param({
            email: $scope.logmail,
            clave: $scope.pass
        });

        $http.post('views/recuperarlogin', datax)
            .success(function (data) {
                mail = data;
                $scope.prueba = mail;
                if( mail != "NO"){
                    $scope.prueba = mail;
                    $http.post('views/obtener_nombre', datax)
                        .success(function (data) {
                            nombre = data;
                            $scope.prueba = nombre;
                            //$scope.Registrarse = paso;
                            //$window.location.href = '#Test';
                        })
                        .error(function (err) {
                            $log.error(err);
                        });

                    $http.post('views/obtener_admin', datax)
                        .success(function (data) {
                            admin = data;
                            $scope.prueba = admin;
                            if (admin == '1'){

                                $window.location.href = '#Admin';
                            }
                            else{
                                $http.post('views/obtener_tipo', datax)
                                    .success(function (data) {
                                        tipo = data;
                                        if(tipo == '0'){
                                            $window.location.href = '#Convergente';
                                        }
                                        else if(tipo == '1'){
                                            $window.location.href = '#Divergente';
                                        }
                                        else if(tipo == '2'){
                                            $window.location.href = '#Adaptador';
                                        }
                                        else if(tipo == '3'){
                                            $window.location.href = '#Asimilador';
                                        }
                                        //$scope.Registrarse = paso;
                                        //$window.location.href = '#Test';
                                    })
                                    .error(function (err) {
                                        $log.error(err);
                                    });

                            }
                            //$scope.Registrarse = paso;
                            //$window.location.href = '#Test';
                        })
                        .error(function (err) {
                            $log.error(err);
                        });

                }
                //$scope.Registrarse = paso;
            })
            .error(function (err) {
                $log.error(err);
                $scope.prueba = 'sadasd';
            });
        $scope.prueba = 'sadasd';


        //dato = $http.get("views/registro2", data);
        console.log('Data posted successfully');
    };

});

ang.controller('convergenteCtrl', function ($scope, $http, $log, $window) {
    if (nombre == ''){
        $window.location.href = '#/home';
    }
    $scope.NombreUser = "Francisco Vasquez Pinto";
    $scope.NombreUser = nombre;
    $scope.submit = function () {
        var datax = $.param({
            nombre: $scope.nuevoNombre,
            rut: $scope.nuevoRut,
            email: $scope.nuevoEmail,
            rol: $scope.nuevoRol,
            clave: $scope.nuevoPassword
        });
        $http.post('views/registro2', datax)
            .success(function (data) {
                mail = data;
                if( mail != "NO"){
                    $http.post('views/obtener_nombre', datax)
                        .success(function (data) {
                            nombre = data;
                            //$scope.Registrarse = paso;
                            $window.location.href = '#Test';
                        })
                        .error(function (err) {
                            $log.error(err);
                        });
                }
                //$scope.Registrarse = paso;
            })
            .error(function (err) {
                $log.error(err);
            });


        //dato = $http.get("views/registro2", data);
        console.log('Data posted successfully');
    };

});

ang.controller('adminCtrl', function ($scope, $http, $log, $window) {
    if (mail == ''){
        $window.location.href = '#/home';
    }
    $scope.PROFESOR = mail;

});
ang.controller('consfeedCtrl', function ($scope, $http, $log, $window) {
    if (mail == ''){
        $window.location.href = '#/home';
    }
    $scope.PROFESOR = mail;

});
