controllers.memberviewgasController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
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
        $scope.exportParms.exportfilename = "exportgascapture.csv";
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
        $scope.exportParms.exportfilename = "exporttrips.csv";

        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        getMemberTrips();
    };
}

controllers.membervieweventsController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
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

                getMemberTripEventDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripEventDetails() {
        $scope.eventdetails = {};
        
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        $order = "ASC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripeventdetails(qdata)
            .success( function(data) {
                $scope.eventdetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function showTripDetail(detail) {
        $scope.current.eventdetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.eventdetail = {};
    }

    
    function resetEventDetailView() {
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
        $scope.current.showtable = 1;
        $scope.eventdetails = {};
        $scope.current.eventdetail = {};

        $scope.exportParms = {};
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "eventcapture";
        $scope.exportParms.exportfilename = "exporteventcapture.csv";
        $scope.downloadurl = "";

        resetEventDetailView();
    };

    $scope.getMemberTripEventDetails = function () {
        getMemberTripEventDetails();
    }

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
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

controllers.memberviewfoodsController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
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

                getMemberTripFoodDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripFoodDetails() {
        $scope.fooddetails = {};
        
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        $order = "ASC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripfooddetails(qdata)
            .success( function(data) {
                $scope.fooddetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function showTripDetail(detail) {
        $scope.current.fooddetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.fooddetail = {};
    }
    
    function resetFoodDetailView() {
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
        $scope.current.showtable = 1;
        $scope.fooddetails = {};
        $scope.current.fooddetail = {};

        $scope.exportParms = {};
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "foodcapture";
        $scope.exportParms.exportfilename = "exportfoodcapture.csv";
        $scope.downloadurl = "";

        resetFoodDetailView();
    };

    $scope.getMemberTripFoodDetails = function () {
        getMemberTripFoodDetails();
    }

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
    }
}

controllers.memberviewfriendsController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
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

                getMemberTripFriendDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripFriendDetails() {
        $scope.frienddetails = {};
        
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        $order = "ASC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripfrienddetails(qdata)
            .success( function(data) {
                $scope.frienddetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function resetFriendDetailView() {
        $scope.membertrips = {};
        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function showTripDetail(detail) {
        $scope.current.frienddetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.frienddetail = {};
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
        $scope.current.showtable = 1;
        $scope.frienddetails = {};
        $scope.current.frienddetail = {};

        $scope.exportParms = {};
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "friendcapture";
        $scope.exportParms.exportfilename = "exportfriendcapture.csv";
        $scope.downloadurl = "";

        resetFriendDetailView();
    };

    $scope.getMemberTripFriendDetails = function () {
        getMemberTripFriendDetails();
    }

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
    }
}

controllers.memberviewovernightsController = function ($scope, $http, $location, memberFactory, exportService, loginService, selectListService) {
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

                getMemberTripOvernightDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripOvernightDetails() {
        $scope.overnightdetails = {};
        
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        $order = "ASC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripovernightdetails(qdata)
            .success( function(data) {
                $scope.overnightdetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }
    
    function resetOvernightDetailView() {
        $scope.membertrips = {};
        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function showTripDetail(detail) {
        $scope.current.overnightdetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.overnightdetail = {};
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
        $scope.current.showtable = 1;
        $scope.overnightdetails = {};
        $scope.current.overnightdetail = {};


        $scope.exportParms = {};
        $scope.exportParms.tripid = $scope.current.tripid;
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "overnightcapture";
        $scope.exportParms.exportfilename = "exportovernightcapture.csv";
        $scope.downloadurl = "";

        resetOvernightDetailView();
    };

    $scope.getMemberTripOvernightDetails = function () {
        getMemberTripOvernightDetails();
    }

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
    }
}
