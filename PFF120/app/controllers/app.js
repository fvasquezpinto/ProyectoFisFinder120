// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute','controller']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

  $routeProvider
      .when('/', {
        templateUrl : '../views/home.html',
        controller  : 'mainController'
      })
      .when('/Registro', {
        templateUrl : '../views/Registro.html',
        controller  : 'RegistroCtrl'
      })
      .when('/Test', {
        templateUrl : '../views/Test.html',
        controller  : 'contactController'
      })
      .when('/a', {
          templateUrl : '../views/a.html',
          controller  : 'contactController'
      })
      .when('/Admin', {
          templateUrl : '../views/Admin.html',
          controller  : 'contactController'
      })
      .otherwise({
        redirectTo: '/'
      });
});

angularRoutingApp.controller('mainController', function($scope) {
  $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('aboutController', function($scope) {
  $scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
  $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});




