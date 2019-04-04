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
                // $scope.current.original.gastotals = data;
                $scope.current.original.gastotals = objectCopy(data);
                })
            .error( function(edata) {
                alert(edata);
            });

    }

    function amountGallonsMilesChange() {

        //-----------------------------------------------------------
        //  calculate out mileage
        //-----------------------------------------------------------

        //
        // Local variables
        // 
        var amtgas = 0;  
        var galgas = 0; 
        var odmgas = 0;
        var cpg = 0; 
        var cpgtot = 0; 
        var milgas = 0;   
        var mpg = 0;
        
        var amtgastot = 0; 
        var galgastot = 0;
        var odmb4 = 0; 
        var miltot = 0;  
        var milgastot = 0;
        var galgastot = 0;
        var mpgtot = 0;
        
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        odmgas = $scope.current.capture.odometer * 1;  
        odmb4 = $scope.current.original.gastotals.odometer * 1; 
        miltot = $scope.current.original.gastotals.totalmiles * 1;
        milgas = odmgas - odmb4;
        milegastot = milgas + miltot;

        $scope.current.capture.odometer = odmgas.toFixed(1);
        $scope.current.capture.miles = milgas.toFixed(1);

        //
        // Totals
        //
        $scope.current.gastotals.totalmiles = milegastot.toFixed(1);

        //----------------------------------------------------------- 
        //  calculate out cost per gallon and total gallons
        //----------------------------------------------------------- 

        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        var amtgas = $scope.current.capture.amount * 1; 
        $scope.current.capture.amount = amtgas.toFixed(2); 

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        amtgas = $scope.current.capture.amount * 1;  
        galgas = $scope.current.capture.gallons * 1; 

        amtgastot = $scope.current.gastotals.totalamount * 1;  
        galgastot = $scope.current.gastotals.totalgallons * 1; 

        amtgastot = (amtgastot + amtgas);  
        galgastot = (galgastot + galgas); 
        
        cpg = amtgas / galgas;
        cpgtot = amtgastot / galgastot;

        $scope.current.capture.costpergallon = cpg.toFixed(2);
        $scope.current.capture.amount = amtgas.toFixed(2);  
        $scope.current.capture.gallons= galgas.toFixed(3);

        //
        // Totals
        //
        $scope.current.gastotals.avecostpergallon = cpgtot.toFixed(2);
        $scope.current.gastotals.totalgallons = galgastot.toFixed(1);
        $scope.current.gastotals.totalamount = amtgastot.toFixed(2);

        //----------------------------------------------------------- 
        //  calculate mpg
        //----------------------------------------------------------- 
        if ($scope.current.capture.miles == undefined || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.miles == "" || $scope.current.capture.gallons == "")
            return;

        milgas = $scope.current.capture.miles * 1;  
        galgas = $scope.current.capture.gallons * 1; 

        milgastot = $scope.current.gastotals.totalmiles * 1;  
        galgastot = $scope.current.gastotals.totalgallons * 1; 

        mpg = milgas / galgas;
        mpgtot = milgastot / galgastot;

        $scope.current.capture.mpg = mpg.toFixed(3);
        $scope.current.capture.miles = milgas.toFixed(2);  
        $scope.current.capture.gallons= galgas.toFixed(3);

        //
        // Totals
        //
        $scope.current.gastotals.totalmpg = mpgtot.toFixed(3);
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
        $scope.current.original = {};

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
