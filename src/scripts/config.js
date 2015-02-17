angular.module('cyphre')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    .otherwise('/');

    $stateProvider
    .state('app', {
        url: '/',
        templateUrl: 'templates/app.html'
    });

    $locationProvider
    .html5Mode(true);
});
