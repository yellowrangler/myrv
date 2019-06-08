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
        .when('/gastripentry',
            {
                controller: 'gastripentryController',
                templateUrl: 'app/partials/gastripentry.html'
            })
        .when('/membermanagegastripentries',
            {
                controller: 'membermanagegastripentriesController',
                templateUrl: 'app/partials/membermanagegastripentries.html'
            })
        .when('/memberviewgastripentries',
            {
                controller: 'memberviewgastripentriesController',
                templateUrl: 'app/partials/memberviewgastripentries.html'
            })
        .when('/memberviewtrips',
            {
                controller: 'memberviewtripsController',
                templateUrl: 'app/partials/memberviewtrips.html'
            })
        .when('/memberviewmember',
            {
                controller: 'memberviewmemberController',
                templateUrl: 'app/partials/memberviewmember.html'
            })
        .when('/membermanagemember',
            {
                controller: 'membermanagememberController',
                templateUrl: 'app/partials/membermanagemember.html'
            })
        .when('/membermanagetrip',
            {
                controller: 'membermanagetripController',
                templateUrl: 'app/partials/membermanagetrip.html'
            })
        .when('/membermanagevehiclerv',
            {
                controller: 'membermanagevehiclervController',
                templateUrl: 'app/partials/membermanagevehicle.html'
            })
        .when('/membermanagevehicleinsurance',
            {
                controller: 'membermanagevehicleinsuranceController',
                templateUrl: 'app/partials/membermanagevehicleinsurance.html'
            })
        .when('/membermanagevehicleroadsideassistance',
            {
                controller: 'membermanagevehicleroadsideassistanceController',
                templateUrl: 'app/partials/membermanagevehicleroadsideassistance.html'
            })
        .when('/membermanagervmembership',
            {
                controller: 'membermanagervmembershipController',
                templateUrl: 'app/partials/membermanagervmembership.html'
            })
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'app/partials/login.html'
            }) 

        .otherwise({redirectTo: '/home' });
});