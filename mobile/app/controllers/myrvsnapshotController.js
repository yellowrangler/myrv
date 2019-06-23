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

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;

         $window.scrollTo(0, 0);

         getMemberDashboardSnapshot();
        
    };         

}    