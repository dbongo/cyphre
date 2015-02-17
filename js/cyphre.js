'use strict';

angular.module('cyphre', [
    'ui.router',
    'ui.bootstrap',
    'cyphre.controllers'
]);

angular.module('cyphre')
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    .otherwise('/');

    $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'templates/app.html'
    });

    $locationProvider
    .html5Mode(true);
}]);

angular.module('cyphre.controllers', [])
.controller('MainCtrl', function MainCtrl() {
    this.heading = 'Cloud storage you actually control';
    this.more = 'Tell me more';
});
