// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute','controller']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

  $routeProvider
      .when('/', {
        templateUrl : '../views/home.html',
        controller  : 'HomeCtrl'
      })
      .when('/Registro', {
        templateUrl : '../views/Registro.html',
        controller  : 'RegistroCtrl'
      })
      .when('/Test', {
        templateUrl : '../views/Test.html',
        controller  : 'TestCtrl'
      })
      .when('/Adaptador', {
          templateUrl : '../views/adaptador.html',
          controller  : 'adaptadorCtrl'
      })
      .when('/Convergente', {
          templateUrl : '../views/convergente.html',
          controller  : 'convergenteCtrl'
      })
      .when('/Divergente', {
          templateUrl : '../views/divergente.html',
          controller  : 'divergenteCtrl'
      })
      .when('/Asimilador', {
          templateUrl : '../views/asimilador.html',
          controller  : 'asimiladorCtrl'
      })
      .when('/Admin', {
          templateUrl : '../views/admin.html',
          controller  : 'adminCtrl'
      })
      .when('/Videos', {
          templateUrl : '../views/videos.html',
          controller  : 'contactController'
      })
      .when('/Visorpdf', {
          templateUrl : '../views/visorpdf.html',
          controller  : 'contactController'
      })
      .when('/Visorvideo', {
          templateUrl : '../views/visorvideo.html',
          controller  : 'contactController'
      })
      .when('/Ejercicios', {
          templateUrl : '../views/ejercicios.html',
          controller  : 'contactController'
      })
      .when('/Contenidos', {
          templateUrl : '../views/contenidos.html',
          controller  : 'contactController'
      })
      .when('/Feedback', {
          templateUrl : '../views/Feedback.html',
          controller  : 'feedbackController'
      })
      .when('/Consfeed', {
          templateUrl : '../views/Consfeed.html',
          controller  : 'consfeedCtrl'
      })
      .when('/Mngacs', {
          templateUrl : '../views/Admcuentas.html',
          controller  : 'feedbackController'
      })
      .when('/Modulos', {
          templateUrl : '../views/Vermodulos.html',
          controller  : 'feedbackController'
      })
      .when('/Herramientas', {
          templateUrl : '../views/Herramsadm.html',
          controller  : 'feedbackController'
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




