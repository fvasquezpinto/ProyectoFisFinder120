angular.module("controller",[])

.controller('RegistroCtrl',['$scope','$http', $log, function ($scope, $http, $log) {

    $http.get('/controllers/bdd.js')
        .success(function (data) {
            $scope.estudiantes = data;
        })
        .error(function (err) {
            $log.error(err);
        })

    $scope.pushData = function($params) {
        $http.post('/controllers/bdd.js',{'nombre':$params.nombre, 'rut':$params.rut, 'email':$params.email, 'password':$params.password, 'rol':$params.rol, 'tipo':$params.tipo})
            .success(function(data) {
                $scope.esudiantes = data;
            })
            .error(function(err) {
                $log.error(err);
            })
    }

    $scope.removeData = function($params) {
        var cnfrm = confirm("Are you sure to delete?");
        if(cnfrm) {
            $http.post('./controllers/removeData.php', {'id':$params})
                .success(function(data) {
                    $scope.estudiantes = data;
                })
                .error(function(err) {
                    $log.error(err);
                })
        } else {
            //
        }

    }

}])