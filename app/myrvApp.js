var myrvApp = angular.module ('myrvApp', [
    'ngRoute', 
    'ngAnimate', 
    'ngTouch', 
    'ui.grid', 
    'ui.grid.selection',
    'ngSanitize',
    'chart.js']);

// define routes for app
myrvApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                controller: 'homeController',
                templateUrl: 'app/partials/home.html'
            }) 
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'app/partials/login.html'
            }) 

        .otherwise({redirectTo: '/home' });
});