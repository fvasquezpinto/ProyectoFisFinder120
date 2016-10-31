'use strict';

angular.module('myApp.home', ['ngRoute'])

// Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/views', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'

        });
    }])

    // Home controller
    .controller('HomeCtrl', [function() {

    }]);




