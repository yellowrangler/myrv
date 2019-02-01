controllers.gastripentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function getMemberTrips() {

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMembertrips(qdata)
            .success( function(data) {
                $scope.membertrips = data;

                getActiveMemberTrip();

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getActiveMemberTrip() {

        $scope.current.activetripid = "";

        for (var i = 0; i < $scope.membertrips.length; i++)
        {
            if ($scope.membertrips[i].currenttrip == 1)
            {
                $scope.current.activetrip = $scope.membertrips[i];
                $scope.current.activetripname = $scope.membertrips[i].tripname;

                // console.log("current trip"+$scope.current.trip);
            }
        }
    }

    function getMembertowvehicles() {
        var qdata = 'vehicletype=towvehicle&memberid='+$scope.current.memberid;
        memberFactory.getMembervehicles(qdata)
            .success( function(data) {
                $scope.membertowvehicles = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberrvehicles() {
        var qdata = 'vehicletype=rv&memberid='+$scope.current.memberid;
        memberFactory.getMembervehicles(qdata)
            .success( function(data) {
                $scope.memberrvvehicles = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }
    

    init();
    function init() {
        //
        // this is not getting called at right time for definig top offset
        // in jquery ready. So adding it here
        //
        setviewpadding();

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
        $scope.current.activetripname = "";

        $scope.membertrips = "";
        $scope.current.activestatetripid = "";
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.capture = {};
        $scope.current.capture.date = getCurrentDateStr();

        $scope.current.gastotals = {};

        // use ng-change in html to calc totals

        getMembertowvehicles();
        getMemberrvehicles();

        getMemberTrips();
    };

    

}
