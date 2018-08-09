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
        .when('/membersetupmember',
            {
                controller: 'membersetupmemberController',
                templateUrl: 'app/partials/membersetupmember.html'
            })
        .when('/membersetuptrip',
            {
                controller: 'membersetuptripController',
                templateUrl: 'app/partials/membersetuptrip.html'
            })
        .when('/membersetupvehiclerv',
            {
                controller: 'membersetupvehiclervController',
                templateUrl: 'app/partials/membersetupvehicle.html'
            })
        .when('/membersetupvehicleinsurance',
            {
                controller: 'membersetupvehicleinsuranceController',
                templateUrl: 'app/partials/membersetupvehicleinsurance.html'
            })
        .when('/membersetupvehicleroadsideassistance',
            {
                controller: 'membersetupvehicleroadsideassistanceController',
                templateUrl: 'app/partials/membersetupvehicleroadsideassistance.html'
            })
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'app/partials/login.html'
            }) 

        .otherwise({redirectTo: '/home' });
});