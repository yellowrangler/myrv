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

    function showTripDetail(detail) {
        $scope.current.gasdetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.gasdetail = {};
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
        $scope.current.gasdetail = {};
         $scope.current.showtable = 1;

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

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
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

    function showTripDetail(detail) {
        $scope.current.tripdetail = detail;

        $scope.current.showtable = 0;
    }

    function hideTripDetail() {
        $scope.current.showtable = 1;

        $scope.current.tripdetail = {};
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
        $scope.current.showtable = 1;
        $scope.current.tripdetail = {};

        $scope.exportParms = {};
        $scope.exportParms.memberid = $scope.current.memberid;
        $scope.exportParms.exportType = "trips";
        $scope.exportParms.exportfilename = "exporttrips.csv";

        $scope.downloadurl = exportService.getExportUrl($scope.exportParms);

        getMemberTrips();
    };

    $scope.showTripDetail = function (detail) {
        showTripDetail(detail);
    }

    $scope.hideTripDetail = function () {
        hideTripDetail();
    }
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

controllers.memberviewrvmembershipController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function resetMemberRVmembershipForm() {
        // $scope.current.rvmembershipid ="";
        $scope.rvmemberships = "";
        $scope.rvmembership = "";

        getMemberRVmemberships();
    }

    function getMemberRVmemberships() {
        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberRVmemberships(qdata)
            .success( function(data) {
                $scope.rvmemberships = data;
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getMemberRvMembership(id) {
        for (var i = 0; i < $scope.rvmemberships.length; i++)
        {
            if ($scope.rvmemberships[i].id == id)
            {
                $scope.rvmembership = $scope.rvmemberships[i];
            }
        }
    }

    init();
    function init() {
        setviewpadding();

        $scope.rvmembershipstatuses = selectListService.getList('memberstatus');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetMemberRVmembershipForm();
    };

    $scope.getMemberRvMembership = function(rvmembership) {
        getMemberRvMembership(rvmembership);
    }
}


controllers.memberviewvehiclervController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function getMemberVehicles() {
        var qdata = 'vehicletype=all&memberid='+$scope.current.memberid;
        memberFactory.getMembervehicles(qdata)
            .success( function(data) {
                $scope.membervehicles = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberVehicle(vehicleid) {
        $scope.current.vehicleid = vehicleid;
        for (var i = 0; i < $scope.membervehicles.length; i++)
        {
            if ($scope.membervehicles[i].id == vehicleid)
            {
                $scope.current.vehicle = $scope.membervehicles[i];
                $scope.current.vehiclename = composeMemberVehicleName($scope.current.vehicle);
            }
        }
    }

    function composeMemberVehicleName(vehicle) {
        var vehiclename = "";
       
        vehiclename = vehicle.vehicletype+" "+vehicle.make+" "+vehicle.model+" "+vehicle.color+" "+vehicle.year+" "+vehicle.platenbr;

        return vehiclename;
    }

    init();
    function init() {
        setviewpadding();

        $scope.states = selectListService.getList('states');
        $scope.vehiclestatuses = selectListService.getList('vehiclestatus');
        $scope.vehicletypes = selectListService.getList('vehicletypes');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        $scope.membervehicles = "";

        getMemberVehicles();
    };

    $scope.getMemberVehicle = function(vehicleid) {
        getMemberVehicle(vehicleid);
    }
}

controllers.memberviewvehicleinsuranceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function resetMemberVehicleInsuranceForm() {
        $scope.current.insuranceid ="";
        $scope.current.inssurancename ="";
        $scope.current.insurance ="";
    }

    function getMemberVehicleInsurances() {
        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMembervehicleinsurances(qdata)
            .success( function(data) {
                $scope.membervehicleinsurances = data;
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getMemberVehicleInsurance(insuranceid) {
        $scope.current.insuranceid = insuranceid;
        console.log("insuranceid get:"+insuranceid);

        for (var i = 0; i < $scope.membervehicleinsurances.length; i++)
        {
            if ($scope.membervehicleinsurances[i].id == insuranceid)
            {
                $scope.current.insurance = $scope.membervehicleinsurances[i];
                $scope.current.insurancename = $scope.membervehicleinsurances[i].insurancename;
                // console.log($scope.current.waypoint);
            }
        }
    }

    init();
    function init() {
        setviewpadding();

        $scope.insurancestatuses = selectListService.getList('insurancestatus');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        $scope.membervehicleinsurances = "";

        getMemberVehicleInsurances();
    };

    $scope.getMemberVehicleInsurance = function(insuranceid) {
        getMemberVehicleInsurance(insuranceid);
    }
}

controllers.memberviewvehicleroadsideassistanceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function resetMemberRoadsideAssistanceForm() {
        $scope.roadsideassistances ="";
        $scope.roadsideassistance ="";

        getMemberVehicleRoadsideAssitances();
    }

    function getMemberVehicleRoadsideAssitances() {
        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMembervehicleroadsideassitances(qdata)
            .success( function(data) {
                $scope.roadsideassistances = data;
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getMemberVehicleRoadsideAssitance(id) {
        for (var i = 0; i < $scope.roadsideassistances.length; i++)
        {
            if ($scope.roadsideassistances[i].id == id)
            {
                $scope.roadsideassistance = $scope.roadsideassistances[i];
            }
        }
    }

    init();
    function init() {
        setviewpadding();

        $scope.roadsideassistancestatuses = selectListService.getList('memberstatus');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        $scope.roadsideassistances = "";

        getMemberVehicleRoadsideAssitances();
    };

    $scope.getMemberVehicleRoadsideAssitance = function(id) {
        getMemberVehicleRoadsideAssitance(id);
    }
}
