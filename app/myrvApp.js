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
        .when('/faqs',
            {
                controller: 'faqsController',
                templateUrl: 'app/partials/faqs.html'
            })  
        .when('/gastripentry',
            {
                controller: 'gastripentryController',
                templateUrl: 'app/partials/gastripentry.html'
            })
        .when('/overnightentry',
            {
                controller: 'overnightetryController',
                templateUrl: 'app/partials/overnightentry.html'
            })
        .when('/foodentry',
            {
                controller: 'foodentryController',
                templateUrl: 'app/partials/foodentry.html'
            })
        .when('/evententry',
            {
                controller: 'evententryController',
                templateUrl: 'app/partials/evententry.html'
            })
        .when('/serviceentry',
            {
                controller: 'serviceentryController',
                templateUrl: 'app/partials/serviceentry.html'
            })
        .when('/friendentry',
            {
                controller: 'friendentryController',
                templateUrl: 'app/partials/friendentry.html'
            })
        .when('/membermanagegas',
            {
                controller: 'membermanagegasController',
                templateUrl: 'app/partials/membermanagegas.html'
            })
        .when('/memberviewgas',
            {
                controller: 'memberviewgasController',
                templateUrl: 'app/partials/memberviewgas.html'
            })
        .when('/memberviewtrips',
            {
                controller: 'memberviewtripsController',
                templateUrl: 'app/partials/memberviewtrips.html'
            })
        .when('/memberviewevents',
            {
                controller: 'membervieweventsController',
                templateUrl: 'app/partials/memberviewevents.html'
            })
        .when('/memberviewfoods',
            {
                controller: 'memberviewfoodsController',
                templateUrl: 'app/partials/memberviewfoods.html'
            })
        .when('/memberviewfriends',
            {
                controller: 'memberviewfriendsController',
                templateUrl: 'app/partials/memberviewfriends.html'
            })
        .when('/memberviewovernights',
            {
                controller: 'memberviewovernightsController',
                templateUrl: 'app/partials/memberviewovernights.html'
            })
        .when('/memberviewmember',
            {
                controller: 'memberviewmemberController',
                templateUrl: 'app/partials/memberviewmember.html'
            })
        .when('/memberviewrvmembership',
            {
                controller: 'memberviewrvmembershipController',
                templateUrl: 'app/partials/memberviewrvmembership.html'
            })
        .when('/memberviewvehiclerv',
            {
                controller: 'memberviewvehiclervController',
                templateUrl: 'app/partials/memberviewvehiclerv.html'
            })
        .when('/memberviewvehicleinsurance',
            {
                controller: 'memberviewvehicleinsuranceController',
                templateUrl: 'app/partials/memberviewvehicleinsurance.html'
            })
        .when('/memberviewvehicleroadsideassistance',
            {
                controller: 'memberviewvehicleroadsideassistanceController',
                templateUrl: 'app/partials/memberviewvehicleroadsideassistance.html'
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
        .when('/membermanageevent',
            {
                controller: 'membermanageeventController',
                templateUrl: 'app/partials/membermanageevent.html'
            })
        .when('/membermanagefood',
            {
                controller: 'membermanagefoodController',
                templateUrl: 'app/partials/membermanagefood.html'
            })
        .when('/membermanageovernight',
            {
                controller: 'membermanageovernightController',
                templateUrl: 'app/partials/membermanageovernight.html'
            })
        .when('/membermanagefriend',
            {
                controller: 'membermanagefriendController',
                templateUrl: 'app/partials/membermanagefriend.html'
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