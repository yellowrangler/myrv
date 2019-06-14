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

        if (isNaN($scope.current.capture.odometer))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Odometer must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

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

        if (isNaN($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        amtgas = $scope.current.capture.amount * 1; 

        $scope.current.capture.amount = amtgas.toFixed(2); 

        // if only have amount then send formated decimal and return 
        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if (isNaN($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        if (isNaN($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

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

        if (isNaN($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if (isNaN($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

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

        if (isNaN($scope.current.capture.gallons))
        {
            alert("Gallons must be a valid number!");

            return;
        }

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

        if (isNaN($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if (isNaN($scope.current.capture.miles))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Miles must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        
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

        if (isNaN($scope.current.capture.odometer))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Odometer must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        calculateMillage();

        //----------------------------------------------------------- 
        //  calculate out amount, cost per gallon and total gallons
        //----------------------------------------------------------- 
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        if (isNaN($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        calculateAmount();

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        if (isNaN($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

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

        if (isNaN($scope.current.capture.miles))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Miles must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        calculateMPG();
    }

    function resetGasCapture() {
        $scope.current.tripname = "";
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

        getMemberTrip();
    }

    function getMemberTrip() {

        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                getMemberTripGasDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripGasDetails() {
        $scope.current.gasdetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
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

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid;
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
            if (data.errtext == "")
            {
                saveGasCaptureTotals();
            }
            else
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
                $('#memCaptureGasDialogModalBody').html("Error saving gas trip entry - "+data.errtext);
                $('#memCaptureGasDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function saveGasCaptureTotals() {
        var formstring = $("#membercapturegasForm").serialize();

        // console.log(formstring);

        memberFactory.saveMembergastripentrytotals(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Success");
                $('#memCaptureGasDialogModalBody').html("Successfully updated gas trip entry detail and totals");

                $('#memCaptureGasDialogModal').modal();

                resetGasCapture();
            }
            else
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
                $('#memCaptureGasDialogModalBody').html("Error saving gas trip entry entry detail and totals - "+data.dbgtext);
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

controllers.overnightetryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {

    function calculateChange() {

       
    }

    function resetOvernightCapture() {
        $scope.membertrips = "";
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.capture = {};
        // $scope.current.capture.datein = getCurrentDateStr();

        getMemberTrip();
    }

    function getMemberTrip() {

        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveOvernightCapture() {
        var formstring = $("#membercaptureovernightForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberovernighttripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureOvernightDialogModalTitle').text("Overnight Trip Entry Success");
                $('#memCaptureOvernightDialogModalBody').html(data.bodytext);
                $('#memCaptureOvernightDialogModal').modal();

                // resetOvernightCapture();
            }
            else
            {
                $('#memCaptureOvernightDialogModalTitle').text("Overnight Trip Entry Error");
                $('#memCaptureOvernightDialogModalBody').html("Error saving overnight trip entry - "+data.errtext);
                $('#memCaptureOvernightDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
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

        $scope.current = {};

        $scope.states = selectListService.getList('states');
        $scope.typestays = selectListService.getList('typestay');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetOvernightCapture();
    };

    $scope.resetOvernightCapture = function () {
        resetOvernightCapture();
    }

    $scope.saveOvernightCapture = function () {
        saveOvernightCapture();
    }

    $scope.setToday = function () {
        $scope.current.capture.datein = getCurrentDateStr();

        // $("#date").val($scope.current.capture.datein);
    }

    $scope.setNow = function () {
        $scope.current.capture.timein = getCurrentTimeStr(12);
    }

    $scope.checkBoxValue = function (field) {
        var check = $("#"+field).val();
        if (check == "on")
        {
            $("#"+field).val("1");
        }

    }
}

controllers.foodentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {

    function calculateChange() {

       
    }

    function resetFoodCapture() {
        $scope.membertrips = "";
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.capture = {};

        getMemberTrip();
    }

    function getMemberTrip() {

        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveFoodCapture() {
        var formstring = $("#membercapturefoodForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberfoodtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureEventDialogModalTitle').text("Restaurant Entry Success");
                $('#memCaptureEventDialogModalBody').html(data.bodytext);
                $('#memCaptureEventDialogModal').modal();

                // resetFoodCapture();
            }
            else
            {
                $('#memCaptureEventDialogModalTitle').text("Restaurant Entry Error");
                $('#memCaptureEventDialogModalBody').html("Error saving restaurant entry - "+data.errtext);
                $('#memCaptureEventDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
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

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetFoodCapture();
    };

    $scope.resetFoodCapture = function () {
        resetFoodCapture();
    }

    $scope.saveFoodCapture = function () {
        saveFoodCapture();
    }

    $scope.setToday = function () {
        $scope.current.capture.date = getCurrentDateStr();

        // $("#date").val($scope.current.capture.datein);
    }

    $scope.setNow = function () {
        $scope.current.capture.time = getCurrentTimeStr(12);
    }
}

controllers.evententryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {

    function calculateChange() {

       
    }

    function resetEventCapture() {
        $scope.membertrips = "";
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.capture = {};

        getMemberTrip();
    }

    function getMemberTrip() {

        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveEventCapture() {
        var formstring = $("#membercaptureentryForm").serialize();

        // console.log(formstring);

        memberFactory.saveMembereventtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureEventDialogModalTitle').text("Special Event Entry Success");
                $('#memCaptureEventDialogModalBody').html(data.bodytext);
                $('#memCaptureEventDialogModal').modal();

                resetEventCapture();
            }
            else
            {
                $('#memCaptureEventDialogModalTitle').text("Special Event Entry Error");
                $('#memCaptureEventDialogModalBody').html("Error saving special event entry - "+data.errtext);
                $('#memCaptureEventDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
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

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetEventCapture();
    };

    $scope.resetEventCapture = function () {
        resetEventCapture();
    }

    $scope.saveEventCapture = function () {
        saveEventCapture();
    }

    $scope.setToday = function () {
        $scope.current.capture.date = getCurrentDateStr();
    }

    $scope.setNow = function () {
        $scope.current.capture.time = getCurrentTimeStr(12);
    }

}

controllers.serviceentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {

    function calculateChange() {

       
    }

    function resetServiceCapture() {
        $scope.membertrips = "";
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.capture = {};
        // $scope.current.capture.datein = getCurrentDateStr();

        getMemberTrip();
        getMemberVehicles();
    }

    function getMemberVehicles() {
        var qdata = 'vehicletype=all&memberid='+$scope.current.memberid;
        memberFactory.getMembervehicles(qdata)
            .success( function(data) {
                $scope.vehicles = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTrip() {
        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveServiceCapture() {
        var formstring = $("#membercaptureserviceForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberservicetripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureServiceDialogModalTitle').text("Auto RV Service Entry Success");
                $('#memCaptureServiceDialogModalBody').html(data.bodytext);
                $('#memCaptureServiceDialogModal').modal();

                resetServiceCapture();
            }
            else
            {
                $('#memCaptureServiceDialogModalTitle').text("Auto RV Service Entry Error");
                $('#memCaptureServiceDialogModalBody').html("Error saving service entry - "+data.errtext);
                $('#memCaptureServiceDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
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

        $scope.current = {};

        $scope.states = selectListService.getList('states');
        $scope.servicetypes = selectListService.getList('autorvservicetype');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetServiceCapture();
    };

    $scope.resetServiceCapture = function () {
        resetServiceCapture();
    }

    $scope.saveServiceCapture = function () {
        saveServiceCapture();
    }

    $scope.setToday = function () {
        $scope.current.capture.date = getCurrentDateStr();
    }

    $scope.setNow = function () {
        $scope.current.capture.time = getCurrentTimeStr(12);
    }

}

controllers.friendentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {

    function calculateChange() {

       
    }

    function resetFriendCapture() {
        $scope.current.email = $scope.current.memberlogin.email;
        $scope.current.capture = {};

        getMemberTrip();
    }

    function getMemberTrip() {

        $scope.current.tripid = "";

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberTrip(qdata)
            .success( function(data) {
                $scope.current.trip = data;
                $scope.current.tripid = data.id;
                $scope.current.tripname = data.tripname;

                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveFriendCapture() {
        var formstring = $("#membercapturefriendForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberfriendtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureFriendDialogModalTitle').text("Special Event Entry Success");
                $('#memCaptureFriendDialogModalBody').html(data.bodytext);
                $('#memCaptureFriendDialogModal').modal();

                resetFriendCapture();
            }
            else
            {
                $('#memCaptureFriendDialogModalTitle').text("Special Event Entry Error");
                $('#memCaptureFriendDialogModalBody').html("Error saving special event entry - "+data.errtext);
                $('#memCaptureFriendDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
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

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetFriendCapture();
    };

    $scope.resetFriendCapture = function () {
        resetFriendCapture();
    }

    $scope.saveFriendCapture = function () {
        saveFriendCapture();
    }

    $scope.setToday = function () {
        $scope.current.capture.date = getCurrentDateStr();
    }

    $scope.setNow = function () {
        $scope.current.capture.time = getCurrentTimeStr(12);
    }

}