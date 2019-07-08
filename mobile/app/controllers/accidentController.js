controllers.accidentwhattodoController = function ($scope, $http, $location, $window, memberFactory, memberFactory, loginService, selectListService) {

    init();
    function init() {
        $scope.current = {};

        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

         $window.scrollTo(0, 0);
        
    };         

}    