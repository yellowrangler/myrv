controllers.gastripentryController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};


    //-----------------------------------------------------------
    //  calculate out mileage
    //-----------------------------------------------------------
    function calculateMillage() {

        //
        // Local variables
        // 
        var milesGas = 0;   
        var odometerGasBefore = 0; 
        var milesGasTotal = 0;  
        var milesTripTotal = 0;   
        var odometerGasCurrent = 0;
        var odometerTripStart = 0;      
        
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.odometer))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Odometer must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.firstgasentry == 1) 
        {
            $scope.current.original.gastotals.odometer = $scope.current.capture.odometer; 
            $scope.current.original.gastotals.startgasodometer = $scope.current.capture.odometer; 

            $scope.current.gastotals.odometer = $scope.current.capture.odometer; 
            $scope.current.gastotals.startgasodometer = $scope.current.capture.odometer; 
        }

        // 
        // Trip miles data
        // 
        odometerTripStart = $scope.current.trip.startodometer * 1;
        odometerGasCurrent = $scope.current.capture.odometer * 1; 
        milesTripTotal = odometerGasCurrent - odometerTripStart;
        $scope.current.trip.totalmiles = milesTripTotal.toFixed(1);


        // 
        //  Gas miles
        // 
        odometerGasCurrent = $scope.current.capture.odometer * 1;  
        odometerGasBefore = $scope.current.original.gastotals.odometer * 1; 
      
        milesGas = odometerGasCurrent - odometerGasBefore;
        milesGasTotal = $scope.current.original.gastotals.totalmiles * 1; 
        milesGasTotal = milesGasTotal + milesGas;

        $scope.current.capture.odometer = odometerGasCurrent.toFixed(1);
        $scope.current.capture.miles = milesGas.toFixed(1);

        //
        // Totals
        //
        $scope.current.gastotals.totalmiles = milesGasTotal.toFixed(1);
    }

    //-----------------------------------------------------------
    //  calculate out amount
    //-----------------------------------------------------------
    function calculateAmount() {

        //
        // Local variables
        // 
        var amountGas = 0; 
        var gallonGas = 0;
        var amountGasTotal = 0;        
        
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        amountGas = $scope.current.capture.amount * 1; 
        $scope.current.capture.amount = amountGas.toFixed(2); 

        // if only have amount then send formated decimal and return 
        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        amountGasTotal = $scope.current.original.gastotals.totalamount * 1;  
        amountGasTotal = (amountGasTotal + amountGas);  
 
        $scope.current.gastotals.totalamount = amountGasTotal.toFixed(2);
    }

    //----------------------------------------------------------- 
    //  calculate out cost per gallon 
    //----------------------------------------------------------- 
    function calculateCPG() {

        //
        // Local variables
        // 
        var amountGas = 0;   
        var gallonGas = 0; 
        var cpg = 0; 

        var amountGasTotal = 0;  
        var gallonsGasTotal = 0;
        var cpgtot = 0;        
        
        if ($scope.current.capture.amount == undefined || $scope.current.capture.amount == "" )
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.amount))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Amount must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if ($scope.current.capture.amount == "" || $scope.current.capture.gallons == "")
            return;

        amountGas = $scope.current.capture.amount * 1;  
        gallonGas = $scope.current.capture.gallons * 1; 

        amountGasTotal = $scope.current.original.gastotals.totalamount * 1;  
        gallonsGasTotal = $scope.current.original.gastotals.totalgallons * 1;  
        amountGasTotal = (amountGasTotal + amountGas);  
        gallonsGasTotal = (gallonsGasTotal + gallonGas); 
        
        if (gallonGas == 0)
        {
            cpg = 0;
        }
        else
        {
            cpg = amountGas / gallonGas;
        }
        
        if (gallonsGasTotal == 0)
        {
            cpgtot = 0;
        }
        else
        {
            cpgtot = amountGasTotal / gallonsGasTotal;
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
        var gallonGas = 0; 
        var gallonsGasTotal = 0;  
        
        if ($scope.current.capture.gallons == "" || $scope.current.capture.gallons == undefined)
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.gallons))
        {
            alert("Gallons must be a valid number!");

            return;
        }

        gallonGas = $scope.current.capture.gallons * 1; 

        gallonsGasTotal = $scope.current.original.gastotals.totalgallons * 1;  
        gallonsGasTotal = (gallonsGasTotal + gallonGas); 
        
        $scope.current.capture.gallons= gallonGas.toFixed(3);
        $scope.current.gastotals.totalgallons = gallonsGasTotal.toFixed(3);
    }

    //----------------------------------------------------------- 
    //  calculate out miles per gallon 
    //----------------------------------------------------------- 
    function calculateMPG() {

        //
        // Local variables
        // 
        var milesGas = 0;
        var gallonGas = 0; 
        var mpg = 0;
        var milesGasTotal = 0;
        var gallonsGasTotal = 0;  
        var mpgTotal = 0;


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

        if (!positiveDecimalPostValidation($scope.current.capture.gallons))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Gallons must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        if (!positiveDecimalPostValidation($scope.current.capture.miles))
        {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
            $('#memCaptureGasDialogModalBody').html("Miles must be a valid number!");
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        
        milesGas = $scope.current.capture.miles * 1;  
        gallonGas = $scope.current.capture.gallons * 1; 

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
            for ($i = 0; $scope.current.original.gasdetails[$i].nottankfilled == 1; $i++)
            {
                catchupDetailMiles = catchupDetailMiles + ($scope.current.original.gasdetails[$i].miles * 1);
                catchupDetailGallons = catchupDetailGallons + ($scope.current.original.gasdetails[$i].gallons * 1);
            }

            $scope.current.gastotals.nottankfilled = 0;
        }  
     
        milesGasTotal = $scope.current.original.gastotals.totalmiles * 1;
        milesGasTotal = milesGasTotal + milesGas;

        gallonsGasTotal = $scope.current.original.gastotals.totalgallons * 1;
        gallaonGasTopoffTotal = $scope.current.original.gastotals.topoffgallons * 1; 
        if ($scope.current.firstgasentry == 1) 
        {
            gallonsGasTotal = gallonGas;
            $scope.current.gastotals.topoffgallons = gallonsGasTotal.toFixed(3);
        }
        else
        {
            gallonsGasTotal = (gallonsGasTotal + gallonGas) - gallaonGasTopoffTotal;
        }
        
        if (gallonGas == 0)
        {
            mpg = 0;
        }
        else
        {
            mpg = (milesGas + catchupDetailMiles) / (gallonGas + catchupDetailGallons);
        }
        
        if (gallonsGasTotal == 0)
        {
            mpgTotal = 0;
        }
        else
        {
            if (milesGasTotal == 0)
            {
                mpgTotal = mpg;
            }
            else
            {
                mpgTotal = milesGasTotal / gallonsGasTotal;
            }
        }

        $scope.current.capture.mpg = mpg.toFixed(3);
        $scope.current.gastotals.avempg = mpgTotal.toFixed(3);
    }

    function calculateChange() {

        //----------------------------------------------------------- 
        //  calculate out mileage
        //----------------------------------------------------------- 
 
        if ($scope.current.capture.odometer == "" || $scope.current.capture.odometer == undefined)
            return;

        if (!positiveDecimalPostValidation($scope.current.capture.odometer))
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

        if (!positiveDecimalPostValidation($scope.current.capture.amount))
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

        if (!positiveDecimalPostValidation($scope.current.capture.gallons))
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

        if (!positiveDecimalPostValidation($scope.current.capture.miles))
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
        $scope.current.firstgasentry = 0;

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

    function emptyGasTotals() {

        var emptyGastTotals = {};

        emptyGastTotals.memberid = $scope.current.memberid;
        emptyGastTotals.tripid = $scope.current.tripid;
        emptyGastTotals.odometer = 0;
        emptyGastTotals.startgasodometer = 0;
        emptyGastTotals.totalamount = 0;
        emptyGastTotals.totalgallons = 0;
        emptyGastTotals.avecostpergallon = 0;
        emptyGastTotals.totalmiles = 0;
        emptyGastTotals.avempg = 0;
        emptyGastTotals.topoffgallons = 0;
        emptyGastTotals.gastotalmiles = 0;

        return emptyGastTotals;
    }

    function getMemberTripGasTotals() {
        $scope.current.gastotals = {};

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid;
        memberFactory.getMembertripgastotals(qdata)
            .success( function(data) {
                if (isEmptyField(data))
                {
                    // 
                    //  must be first time gas capture
                    // 
                    $scope.current.gastotals = objectCopy(emptyGasTotals());
                    $scope.current.original.gastotals = objectCopy(emptyGasTotals());

                    $scope.current.firstgasentry = 1;
                }
                else
                {
                    $scope.current.gastotals = objectCopy(data);
                    $scope.current.original.gastotals = objectCopy(data);

                    $scope.current.firstgasentry = 0;
                }
            })
            .error( function(edata) {
                alert(edata);
            });

    }

    function validateForm() {
        var errmsg = "";
        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.amount) || isEmptyField($scope.current.capture.amount))
        {
            errmsg += "Amount is required and must be a valid number!  <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.gallons) || isEmptyField($scope.current.capture.gallons))
        {
            errmsg += "Gallons are required and must be a valid number!   <br><br>";
        }

        if (isEmptyField($scope.current.capture.date) || !isValidDate($scope.current.capture.date))
        {
            errmsg += "Date is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }


    function saveGasCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureGasDialogModalTitle').text("Gas Trip Form Error");
            $('#memCaptureGasDialogModalBody').html(errmsg);
            $('#memCaptureGasDialogModal').modal();

            return;
        }

        var qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid+'&odometer='+$scope.current.capture.odometer+'&target=gasdetails';
        memberFactory.odometerDoubleEntryCheck(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                var formstring = $("#membercapturegasForm").serialize();
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
            else if (data.msgtext == "dupe") 
            {
                $('#memCaptureGasDialogModalTitle').text("Gas Trip Entry Error");
                $('#memCaptureGasDialogModalBody').html("Duplicate odometer gas trip entry");
                $('#memCaptureGasDialogModal').modal();
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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetGasCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

    $scope.gallonsRealtimeValidation = function (e) {
        gallonsRealtimeValidation(e);
    }

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

    function validateForm() {
        var errmsg = "";
        if (isEmptyField($scope.current.capture.overnightname))
        {
            errmsg += "Overnight name is required! <br><br>";
        }

        if (selectFieldBadValue($scope.current.capture.typestay))
        {
            errmsg += "Type stay is required! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.costperday) || isEmptyField($scope.current.capture.costperday))
        {
            errmsg += "Cost per day is required and must be a valid number!  <br><br>";
        }

        if (isEmptyField($scope.current.capture.datein) || !isValidDate($scope.current.capture.datein))
        {
            errmsg += "Date In is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }

    function saveOvernightCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureOvernightDialogModalTitle').text("Overnight Trip Entry Form Error");
            $('#memCaptureOvernightDialogModalBody').html(errmsg);
            $('#memCaptureOvernightDialogModal').modal();

            return;
        }

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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.current = {};

        $scope.states = selectListService.getList('states');
        $scope.typestays = selectListService.getList('typestay');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetOvernightCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

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

    function validateForm() {
        var errmsg = "";
        if (isEmptyField($scope.current.capture.restaurant))
        {
            errmsg += "Restaurant name is required! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.cost) || isEmptyField($scope.current.capture.costperday))
        {
            errmsg += "Cost is required and must be a valid number!  <br><br>";
        }

        if (isEmptyField($scope.current.capture.date) || !isValidDate($scope.current.capture.date))
        {
            errmsg += "Date is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }

    function saveFoodCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureFoodDialogModalTitle').text("Restaurant Entry Form Error");
            $('#memCaptureFoodDialogModalBody').html(errmsg);
            $('#memCaptureFoodDialogModal').modal();

            return;
        }

        var formstring = $("#membercapturefoodForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberfoodtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureFoodDialogModalTitle').text("Restaurant Entry Success");
                $('#memCaptureFoodDialogModalBody').html(data.bodytext);
                $('#memCaptureFoodDialogModal').modal();

                // resetFoodCapture();
            }
            else
            {
                $('#memCaptureFoodDialogModalTitle').text("Restaurant Entry Error");
                $('#memCaptureFoodDialogModalBody').html("Error saving restaurant entry - "+data.errtext);
                $('#memCaptureFoodDialogModal').modal();
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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetFoodCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

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

    function validateForm() {
        var errmsg = "";
        if (isEmptyField($scope.current.capture.event))
        {
            errmsg += "Event name is required! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.cost) || isEmptyField($scope.current.capture.costperday))
        {
            errmsg += "Cost is required and must be a valid number!  <br><br>";
        }

        if (isEmptyField($scope.current.capture.date) || !isValidDate($scope.current.capture.date))
        {
            errmsg += "Date is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }

    function saveEventCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureEventDialogModalTitle').text("Special Event Entry Form Error");
            $('#memCaptureEventDialogModalBody').html(errmsg);
            $('#memCaptureEventDialogModal').modal();

            return;
        }

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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetEventCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

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

    function validateForm() {
        var errmsg = "";
        if (isEmptyField($scope.current.capture.serviceplace))
        {
            errmsg += "Service Establishment is required! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.cost) || isEmptyField($scope.current.capture.costperday))
        {
            errmsg += "Cost is required and must be a valid number!  <br><br>";
        }

        if (selectFieldBadValue($scope.current.capture.servicetype))
        {
            errmsg += "Service type is required! <br><br>";
        }

        if (selectFieldBadValue($scope.current.capture.vehicleid))
        {
            errmsg += "Vehicle is required! <br><br>";
        }

        if (isEmptyField($scope.current.capture.date) || !isValidDate($scope.current.capture.date))
        {
            errmsg += "Date is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }

    function saveServiceCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureServiceDialogModalTitle').text("Auto RV Service Entry Form Error");
            $('#memCaptureServiceDialogModalBody').html(errmsg);
            $('#memCaptureServiceDialogModal').modal();

            return;
        }

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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.current = {};

        $scope.states = selectListService.getList('states');
        $scope.servicetypes = selectListService.getList('autorvservicetype');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetServiceCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

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

    function validateForm() {
        var errmsg = "";
        if (isEmptyField($scope.current.capture.friend))
        {
            errmsg += "Friend name is required! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.capture.odometer) || isEmptyField($scope.current.capture.odometer))
        {
            errmsg += "Odometer is required and must be a valid number! <br><br>";
        }

        if (isEmptyField($scope.current.capture.date) || !isValidDate($scope.current.capture.date))
        {
            errmsg += "Date is required and must be a valid date! <br><br>";
            $scope.current.capture.date = "";
        }

        return errmsg;
    }

    function saveFriendCapture() {

        var errmsg = validateForm();

        if (errmsg != "") {
            $('#memCaptureFriendDialogModalTitle').text("Friend Entry Form Error");
            $('#memCaptureFriendDialogModalBody').html(errmsg);
            $('#memCaptureFriendDialogModal').modal();

            return;
        }

        var formstring = $("#membercapturefriendForm").serialize();

        // console.log(formstring);

        memberFactory.saveMemberfriendtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memCaptureFriendDialogModalTitle').text("Friend Entry Success");
                $('#memCaptureFriendDialogModalBody').html(data.bodytext);
                $('#memCaptureFriendDialogModal').modal();

                resetFriendCapture();
            }
            else
            {
                $('#memCaptureFriendDialogModalTitle').text("Friend Entry Error");
                $('#memCaptureFriendDialogModalBody').html("Error saving friend entry - "+data.errtext);
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
        var loggedIn = loginService.isLoggedIn();
        if (!loggedIn)
        {
            // new code
            alert("Whoops! You must login in order to continue!");
                
            // alert ("You must login in order to continue!")
            $location.path("#home");
        }

        $scope.current = {};

        $scope.states = selectListService.getList('states');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        resetFriendCapture();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

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