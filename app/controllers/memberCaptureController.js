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
                $scope.current.activetripid = $scope.current.activetrip.id
                $scope.current.activetripname = $scope.membertrips[i].tripname;


                getMemberTripGasTotals();

                // console.log("current trip"+$scope.current.trip);
            }
        }

    }

    function getMemberTripGasTotals() {
        $scope.current.gastotals = {};

        var qdata = 'tripid='+$scope.current.activetripid+'&memberid='+$scope.current.memberid;
        memberFactory.getMembertripgastotals(qdata)
            .success( function(data) {
                $scope.current.gastotals = data;
                $scope.current.originaltotalmiles = data.totalamount;


                var i = 0;

                })
            .error( function(edata) {
                alert(edata);
            });

    }

    function amountGallonsMilesChange() {

        // 
        //  calculate out mileage
        // 
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        var odgas = $scope.current.capture.odometer;  
        var odtot = $scope.current.gastotals.odometer; 
        var mitot = $scope.current.originaltotalmiles;
        var milesgasgone = odgas - odtot;
        var milestotalgone = (odtot * 1) + (milesgasgone * 1);

        $scope.current.capture.miles = milesgasgone.toFixed(1);
        $scope.current.gastotals.totalmiles = milestotalgone.toFixed(1);

        // 
        //  calculate out cost per gallon
        // 
        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        if ($scope.current.capture.amount == undefined || $scope.current.capture.gallons == undefined)
            return;

        var amtgas = $scope.current.capture.amount;  
        var galgas = $scope.current.capture.gallons; 
        var cpg = amtgas / galgas;

        $scope.current.capture.costpergallon = cpg.toFixed(2);

        // 
        //  calculate mpg
        // 
        if ($scope.current.capture.miles == "" || $scope.current.capture.gallons == "")
            return;

        if ($scope.current.capture.miles == undefined || $scope.current.capture.gallons == undefined)
            return;

        var milgas = $scope.current.capture.miles;  
        var galgas = $scope.current.capture.gallons; 
        var mpg = milgas / galgas;

        $scope.current.capture.mpg = mpg.toFixed(3);
    }

    function clearGasCapture() {
        
    }

    function saveGasCapture() {
        
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
        $scope.current.originaltotalmiles = "";

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

    $scope.clearGasCapture = function () {
        clearGasCapture();
    }

    $scope.saveGasCapture = function () {
        saveGasCapture();
    }

    $scope.amountGallonsMilesChange = function () {
        amountGallonsMilesChange();
    }

}
