controllers.gastripentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};


    //-----------------------------------------------------------
    //  calculate out mileage
    //-----------------------------------------------------------
    function calculateMillage() {

        //
        // Local variables
        // 
        var milgas = 0;   
        var odmb4 = 0; 
        var miltot = 0;  
        var milgas = 0;        
        
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        odmgas = $scope.current.capture.odometer * 1;  
        odmb4 = $scope.current.original.gastotals.odometer * 1; 
        milgas = odmgas - odmb4;

        miltot = $scope.current.original.gastotals.totalmiles * 1;
        miltot = miltot + milgas;

        $scope.current.capture.odometer = odmgas.toFixed(1);
        $scope.current.capture.miles = milgas.toFixed(1);

        //
        // Totals
        //
        $scope.current.gastotals.totalmiles = miltot.toFixed(1);
    }

    //-----------------------------------------------------------
    //  calculate out amount
    //-----------------------------------------------------------
    function calculateAmount() {

        //
        // Local variables
        // 
        var amtgas = 0; 
        var galgas = 0;
        var amtgastot = 0;        
        
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        amtgas = $scope.current.capture.amount * 1; 

        $scope.current.capture.amount = amtgas.toFixed(2); 

        // if only have amount then send formated decimal and return 
        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        amtgastot = $scope.current.original.gastotals.totalamount * 1;  
        amtgastot = (amtgastot + amtgas);  
 
        $scope.current.gastotals.totalamount = amtgastot.toFixed(2);

    }

    //----------------------------------------------------------- 
    //  calculate out cost per gallon 
    //----------------------------------------------------------- 
    function calculateCPG() {

        //
        // Local variables
        // 
        var amtgas = 0;   
        var galgas = 0; 
        var cpg = 0; 

        var amtgastot = 0;  
        var galgastot = 0;
        var cpgtot = 0;        
        
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        amtgas = $scope.current.capture.amount * 1;  
        galgas = $scope.current.capture.gallons * 1; 

        amtgastot = $scope.current.original.gastotals.totalamount * 1;  
        galgastot = $scope.current.original.gastotals.totalgallons * 1; 

        amtgastot = (amtgastot + amtgas);  
        galgastot = (galgastot + galgas); 
        
        if (galgas == 0)
        {
            cpg = 0;
        }
        else
        {
            cpg = amtgas / galgas;
        }
        
        if (galgastot == 0)
        {
            cpgtot = 0;
        }
        else
        {
            cpgtot = amtgastot / galgastot;
        }

        $scope.current.capture.costpergallon = cpg.toFixed(3);
        $scope.current.gastotals.avecostpergallon = cpgtot.toFixed(3);
    }

    //----------------------------------------------------------- 
    //  calculate out cost per gallon 
    //----------------------------------------------------------- 
    function calculateGallons() {

        //
        // Local variables
        // 
        var galgas = 0; 
        var galgastot = 0;  
        
        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        galgas = $scope.current.capture.gallons * 1; 
        galgastot = $scope.current.original.gastotals.totalgallons * 1; 
        galgastot = (galgastot + galgas); 
        
        $scope.current.capture.gallons= galgas.toFixed(3);
        $scope.current.gastotals.totalgallons = galgastot.toFixed(3);
 
    }

    //----------------------------------------------------------- 
    //  calculate out miles per gallon 
    //----------------------------------------------------------- 
    function calculateMPG() {

        //
        // Local variables
        // 
        var milgas = 0;
        var galgas = 0; 
        var mpg = 0;
        var milgastot = 0;
        var galgastot = 0;  
        var mpgtot = 0;


        // 
        // if tank not filled no mpg
        //
        if ($scope.current.capture.nottankfilled)
        {
            $scope.current.capture.mpg = mpg.toFixed(3);
            $scope.current.gastotals.avempg = $scope.current.original.gastotals.avempg;
            $scope.current.gastotals.nottankfilled = 1;

            return;
        }
        
        if ($scope.current.capture.miles == undefined || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.miles == "" || $scope.current.capture.gallons == "")
            return;
        
        milgas = $scope.current.capture.miles * 1;  
        galgas = $scope.current.capture.gallons * 1; 

        // 
        //  we must provide for a tank not full
        // 
        var catchupDetailMiles = 0;
        var catchupDetailGallons = 0;
        if ($scope.current.original.gastotals.nottankfilled)
        {
            // 
            // we must now gather miles and gallons to provide true mpg
            // 
            // var arrayLength = objectArraySize($scope.current.original.gasdetails);
            for ($i = 0; $scope.current.original.gasdetails[$i].nottankfilled == 1; $i++)
            {
                catchupDetailMiles = catchupDetailMiles + ($scope.current.original.gasdetails[$i].miles * 1);
                catchupDetailGallons = catchupDetailGallons + ($scope.current.original.gasdetails[$i].gallons * 1);
            }

            $scope.current.gastotals.nottankfilled = 0;
        }

        milgastot = $scope.current.original.gastotals.totalmiles * 1;  
        milgastot = milgastot + milgas;

        galgastot = $scope.current.original.gastotals.totalgallons * 1; 
        galgastopofftot = $scope.current.original.gastotals.topoffgallons * 1;
        if (milgastot > 0)
        {
            galgastot = (galgastot + galgas) - galgastopofftot;
        }
        else
        {
            galgastot = galgastot + galgas;
            $scope.current.gastotals.topoffgallons = galgastot.toFixed(3);
        }
        
        if (galgas == 0)
        {
            mpg = 0;
        }
        else
        {
            mpg = (milgas + catchupDetailMiles) / (galgas + catchupDetailGallons);
        }
        
        if (galgastot == 0)
        {
            mpgtot = 0;
        }
        else
        {
            if (milgastot == 0)
            {
                mpgtot = mpg;
            }
            else
            {
                mpgtot = milgastot / galgastot;
            }
        }

        $scope.current.capture.mpg = mpg.toFixed(3);
        $scope.current.gastotals.avempg = mpgtot.toFixed(3);
    }


    function calculateChange() {

        //----------------------------------------------------------- 
        //  calculate out mileage
        //----------------------------------------------------------- 
 
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        calculateMillage();

        //----------------------------------------------------------- 
        //  calculate out amount, cost per gallon and total gallons
        //----------------------------------------------------------- 
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        calculateAmount();

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        calculateAmount();
        calculateGallons();
        calculateCPG();

        //----------------------------------------------------------- 
        //  calculate mpg
        //----------------------------------------------------------- 
        if ($scope.current.capture.miles == undefined || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.miles == "" || $scope.current.capture.gallons == "")
            return;

        calculateMPG();
    }

    function resetGasCapture() {
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

        getActiveMemberTrip();
    }

    function getActiveMemberTrip() {

        $scope.current.activetripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getActiveMembertrip(qdata)
            .success( function(data) {
                $scope.current.activetrip = data;
                $scope.current.activetripid = data.id
                $scope.current.activetripname = data.tripname;

                getMemberTripGasDetais();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripGasDetais() {
        $scope.current.gasdetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.activetripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripgasdetails(qdata)
            .success( function(data) {
                $scope.current.original.gasdetails = objectCopy(data);

                getMemberTripGasTotals();
                })
            .error( function(edata) {
                alert(edata);
            });

    }

    function getMemberTripGasTotals() {
        $scope.current.gastotals = {};

        var qdata = 'tripid='+$scope.current.activetripid+'&memberid='+$scope.current.memberid;
        memberFactory.getMembertripgastotals(qdata)
            .success( function(data) {
                $scope.current.gastotals = objectCopy(data);
                
                $scope.current.original.gastotals = objectCopy(data);
                })
            .error( function(edata) {
                alert(edata);
            });

    }

    function saveGasCapture() {
        var formstring = $("#membercapturegasForm").serialize();

        // console.log(formstring);

        memberFactory.saveMembergastripentry(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Success");
                $('#memCaptureGasDialogModalBody').html(data.bodytext);

                $('#memCaptureGasDialogModal').modal();

                resetGasCapture();
            }
            else
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
                $('#memCaptureGasDialogModalBody').html("Error saving gas trip entry - "+data.dbgtext);
                $('#memCaptureGasDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
        })
        .error( function(edata) {
            alert(edata);
        });
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

        resetGasCapture();
    };

    $scope.resetGasCapture = function () {
        resetGasCapture();
    }

    $scope.saveGasCapture = function () {
        saveGasCapture();
    }

    $scope.calculateChange = function () {
        calculateChange();
    }

    $scope.setToday = function () {
        $scope.current.capture.date = getCurrentDateStr();

        $("#date").val($scope.current.capture.date);
    }

    $scope.setNow = function () {
        $scope.current.capture.time = getCurrentTimeStr(12);
    }

}
