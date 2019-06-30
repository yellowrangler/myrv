controllers.myrvsnapshotController = function ($scope, $http, $location, $window, memberFactory, memberFactory, loginService, selectListService) {

        function getMemberDashboardSnapshot() {
            getMemberInfo();

            var qdata = 'memberid='+$scope.current.memberid;
            memberFactory.getMemberDashboardSnapshot(qdata)
                .success( function(data) {
                    $scope.current.snapshot = data;
                    })
                .error( function(edata) {
                    alert(edata);
                }); 
    }

    function getMemberInfo() {
        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
    }


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

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;

         $window.scrollTo(0, 0);

         getMemberDashboardSnapshot();
        
    };         

}    