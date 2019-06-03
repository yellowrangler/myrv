controllers.memberviewgastripentriesController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
    $scope.current = {};

    function getMemberTrips() {

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrips(qdata)
            .success( function(data) {
                $scope.membertrips = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTrip() {

        var qdata = "";
        if ($scope.current.tripid == "")
        {
            qdata = 'memberid='+$scope.current.memberid;
        }
        else
        {
            qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid;
        }

        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id
                $scope.current.tripname = data.tripname;

                $scope.exportParms.tripid = $scope.current.tripid;
                $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

                getMemberTripGasDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripGasDetails() {
        $scope.gasdetails = {};
        
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        $order = "ASC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripgasdetails(qdata)
            .success( function(data) {
                $scope.gasdetails = objectCopy(data);

                getMemberTripGasTotals();
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getMemberTripGasTotals() {
        $scope.gastotals = {};

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid;
        memberFactory.getMembertripgastotals(qdata)
            .success( function(data) {
                $scope.gastotals = objectCopy(data);
                })
            .error( function(edata) {
                alert(edata);
            });

    }
    
    function resetGasDetailView() {
        $scope.membertrips = {};
        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
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
        $scope.current.tripid = "";

        $scope.exportParms = {};
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "gascapture";
        $scope.downloadurl = "";

        resetGasDetailView();
    };

    $scope.getMemberTripGasDetails = function () {
        getMemberTripGasDetails();
    }
}

controllers.memberviewtripsController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
    $scope.current = {};

    function getMemberTrips() {

        var qdata = 'memberid='+$scope.current.memberid+"&export=1";
        memberFactory.getMemberTrips(qdata)
            .success( function(data) {
                $scope.membertrips = data;
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

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        $scope.exportParms = {};
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "trips";
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        getMemberTrips();
    };

    $scope.getMemberTripGasDetails = function () {
        getMemberTripGasDetails();
    }
}

controllers.memberviewmemberController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function getMember()
    {
        var q = "memberid="+$scope.current.memberid;
        memberFactory.getMember(q)
        .success( function(data) {
            $scope.current = data;

            if ($scope.current.avatar == "")
            {
                $scope.current.avatar = "default.png";
            }

            $scope.current.vpassword = $scope.current.password;
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

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;

        getMember();
    };
}

