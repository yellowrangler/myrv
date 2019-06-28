controllers.membermanagememberController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

        $scope.states = selectListService.getList('states');
        $scope.membergenders = selectListService.getList('membergenders');  

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;

        getMember();
    };

    $scope.updatemember = function() {
        var val1 = $("#password").val();
        var val2 = $("#vpassword").val();
        if (val1 !== val2)
        {
            alert ("Passwords do not match!")

        }
        else
        {
            var formstring = $("#membermanagememberForm").serialize();
            // var formstringClean = encodeURIComponent(formstring);

            memberFactory.membermanageMember(formstring)
            .success( function(data) {
                if (data == "ok")
                {
                    $('#membermanageMemberDialogModalTitle').text("Member Update Success");
                    $('#membermanageMemberDialogModalBody').text("Member "+$scope.current.membername+" updated succesfully!");
                    $('#membermanageMemberDialogModal').modal();
                }
                else
                {
                    $('#membermanageMemberDialogModalTitle').text("Member Update Error");
                    $('#membermanageMemberDialogModalBody').text("Error updating member - "+data);
                    $('#membermanageMemberDialogModal').modal();
                }
            })
            .error( function(edata) {
                alert(edata);
            });
        }
    }

    $scope.updateAvatar = function() {
        $('#mebermanageMemberDialogModalTitle').text("Update Avatar Information");
        $('#mebermanageMemberDialogModalBody').html("<center>At this time please send me your Avatar via eMail! <BR />We will open this up some day.</center>");
        $('#mebermanageMemberDialogModal').modal();
    }
}

controllers.membermanagetripController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function getMemberTrip(tripid) {

        $scope.current.tripid = tripid;

        for (var i = 0; i < $scope.membertrips.length; i++)
        {
            if ($scope.membertrips[i].id == tripid)
            {
                $scope.current.trip = $scope.membertrips[i];
                $scope.current.tripname = $scope.membertrips[i].tripname;

                // console.log("current trip"+$scope.current.trip);
            }
        }
    }

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

    function validateForm() {
        var errmsg = "";

        $scope.current.trip.startdate = $("#startdate").val();
        if (!isValidDate($scope.current.trip.startdate))
        {
            errmsg += "Start date must be a valid date! <br><br>";
            $scope.current.trip.startdate = "";
        }

        $scope.current.trip.startodometer = $("#startodometer").val();
        if (!positiveDecimalPostValidation($scope.current.trip.startodometer))
        {
            errmsg += "Starting odometer must be a valid number! <br><br>";
            $scope.current.trip.startodometer = "";
        }

        $scope.current.trip.endodometer = $("#endodometer").val();
        if (!positiveDecimalPostValidation($scope.current.trip.endodometer) && $scope.current.trip.endodometer != "")
        {
            errmsg += "Starting odometer must be a valid number! <br><br>";
            $scope.current.trip.endodometer = "";
        }

        $scope.current.trip.endodometer = $("#enddate").val();
        if (!isValidDate($scope.current.trip.enddate) && $scope.current.trip.enddate != "")
        {
            errmsg += "End date must be a valid date! <br><br>";
            $scope.current.trip.enddate = "";
        }

        return errmsg;
    }

    function saveMemberTrip() {

        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#tripmanageMemberDialogModalTitle').text("The Following errors must be fixed");
            $('#tripmanageMemberDialogModalBody').html(retmsg);
            $('#tripmanageMemberDialogModal').modal();

            return;
        }

        var formstring = $("#membermanagetripForm").serialize();
        // var formstringClean = encodeURIComponent(formstring);

        // console.log("trip form serialize:"+formstring);

        memberFactory.savememberTrip(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.tripid = data.tripid;
                $scope.current.tripname = data.tripname;

                $('#tripmanageMemberDialogModalTitle').text("Member Trip Save Success");
                $('#tripmanageMemberDialogModalBody').html("Trip information saved succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                $('#tripmanageMemberDialogModal').modal();

                getMemberTrips();
                resetTripForm();
            }
            else
            {
                $('#tripmanageMemberDialogModalTitle').text("Member Trip save Error");
                $('#tripmanageMemberDialogModalBody').text("Error saving trip - "+data);
                $('#tripmanageMemberDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

     function DeleteMemberTrip() {
        var qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid+"&tripname="+$scope.current.tripname;

        // console.log("trip form delete:"+qdata);

        memberFactory.deletememberTrip(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.tripid = data.tripid;
                $scope.current.tripname = data.tripname;

                $('#tripmanageMemberDialogModalTitle').text("Member Trip Delete Success");
                $('#tripmanageMemberDialogModalBody').html("Trip information deleted succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                $('#tripmanageMemberDialogModal').modal();

                resetTripForm();

                getMemberTrips();
            }
            else
            {
                $('#tripmanageMemberDialogModalTitle').text("Member Trip Delete Error");
                $('#tripmanageMemberDialogModalBody').text("Error updating trip - "+data);
                $('#tripmanageMemberDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
     }

    function resetTripForm() {
        // $("#membermanagetripForm")[0].reset();

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.tripid = "";
        $scope.current.tripname = "";
        $scope.current.trip = "";
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

    function odometerChange(e)
    {
        var odometer = 0;
        var errmsg = "";

        if (!positiveDecimalPostValidation(e.currentTarget.value))
        {
            errmsg = "Field " + e.currentTarget.id + "must be a valid number! \n\n";

            $scope.current.trip.startodometer = "";
            e.currentTarget.value = "";

            $('#tripmanageMemberDialogModalTitle').text("Odometer Error");
            $('#tripmanageMemberDialogModalBody').text(errmsg);
            $('#tripmanageMemberDialogModal').modal();
        }
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
        $scope.membertrips = "";

        $scope.current.trip = {};
        $scope.current.tripname = "";
        $scope.current.tripid = "";

        $scope.current.email = $scope.current.memberlogin.email;

        getMembertowvehicles();
        getMemberrvehicles();

        getMemberTrips();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.getMemberTrip = function (tripid) {
        getMemberTrip(tripid);
    }

    $scope.clearTrip = function () {
        resetTripForm();
    }

    $scope.saveMemberTrip = function () {
        saveMemberTrip();
    }

    $scope.tripAdd = function () {
        saveMemberTrip();
    }

    $scope.DeleteMemberTrip = function () {
        DeleteMemberTrip();
    }

    $scope.odometerChange = function (e) {
        odometerChange(e);
    }

  }

controllers.membermanagevehiclervController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function getMemberVehicles() {
        var qdata = 'vehicletype=all&memberid='+$scope.current.memberid;
        memberFactory.getMembervehicles(qdata)
            .success( function(data) {
                $scope.membervehicles = data;
                // console.log($scope.membervehicles);
                // console.log("vehicleid get current:"+$scope.current.vehicleid);
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberVehicle(vehicleid) {
        $scope.current.vehicleid = vehicleid;
        console.log("vehicleid get:"+vehicleid);

        for (var i = 0; i < $scope.membervehicles.length; i++)
        {
            if ($scope.membervehicles[i].id == vehicleid)
            {
                $scope.current.vehicle = $scope.membervehicles[i];
                $scope.current.vehiclename = composeMemberVehicleName($scope.current.vehicle);

                // console.log($scope.current.waypoint);
            }
        }
    }

    function resetMemberVehicleForm() {
        $scope.current.vehicleid ="";
        $scope.current.vehiclename ="";
        $scope.current.vehicle ="";
    }

    function composeMemberVehicleName(vehicle) {
        var vehiclename = "";
       
        vehiclename = vehicle.vehicletype+" "+vehicle.make+" "+vehicle.model+" "+vehicle.color+" "+vehicle.year+" "+vehicle.platenbr;

        return vehiclename;
    }
    
    function updateMemberVehicle() {
        var formstring = $("#membermanagevehicleForm").serialize();

        // console.log(formstring);

        memberFactory.savememberVehicle(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.vehicleid = data.vehicleid;
                $scope.current.vehiclename = data.vehiclename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#membermanageVehicleDialogModalTitle').text("Member Update Vehicle Success");
                $('#membermanageVehicleDialogModalBody').html("Vehicle information updated succesfully for Vehicle <span style='color:teal;font-weight:700'>"+$scope.current.vehiclename+"</span>");
                $('#membermanageVehicleDialogModal').modal();
 
                $scope.membervehicles = "";

                resetMemberVehicleForm();
                getMemberVehicles();
            }
            else
            {
                $('#membermanageVehicleDialogModalTitle').text("Member Update Vehicle Error");
                $('#membermanageVehicleDialogModalBody').text("Error updating Vehicle - "+data);
                $('#membermanageVehicleDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteMemberVehicle() {
        var qdata = 'memberid='+$scope.current.memberid+'&vehicleid='+$scope.current.vehicleid+"&vehiclename="+$scope.current.vehiclename;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deleteMemberVehicle(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.vehicleid = data.vehicleid;
                $scope.current.vehiclename = data.vehiclename;

                $('#membermanageVehicleDialogModalTitle').text("Member Vehicle Delete Success");
                $('#membermanageVehicleDialogModalBody').html("Vehicle information deleted succesfully for Vehicle <span style='color:teal;font-weight:700'>"+$scope.current.vehiclename+"</span>!");
                $('#membermanageVehicleDialogModal').modal();

                $scope.current.vehicleid = "";
                $scope.current.vehiclename = "";

                resetMemberVehicleForm();
                getMemberVehicles();
            }
            else
            {
                $('#membermanageVehicleDialogModalTitle').text("Member Vehicle Delete Error");
                $('#membermanageVehicleDialogModalBody').text("Error deleting Vehicle - "+data);
                $('#membermanageVehicleDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
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

    $scope.newVehicle = function () {
        resetMemberVehicleForm();
    }

    $scope.updateMemberVehicle = function () {
        updateMemberVehicle();
    }

    $scope.deleteMemberVehicle = function () {
        deleteMemberVehicle();
    }
}

controllers.membermanagevehicleinsuranceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

    function updateMemberVehicleInsurance() {
        var formstring = $("#membermanagevehicleinsuranceForm").serialize();

        // console.log(formstring);

        memberFactory.saveMembervehicleinsurance(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.insuranceid = data.insuranceid;
                $scope.current.insurancename = data.insurancename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#membermanageVehicleInsuranceDialogModalTitle').text("Member Update Vehicle Insurance Success");
                $('#membermanageVehicleInsuranceDialogModalBody').html("Vehicle information updated succesfully for Vehicle Insurance <span style='color:teal;font-weight:700'>"+$scope.current.insurancename+"</span>");
                $('#membermanageVehicleInsuranceDialogModal').modal();
 
                $scope.membervehicleinsurances = "";

                resetMemberVehicleInsuranceForm();
                getMemberVehicleInsurances();
            }
            else
            {
                $('#membermanageVehicleInsuranceDialogModalTitle').text("Member Update Vehicle Insurance Error");
                $('#membermanageVehicleInsuranceDialogModalBody').text("Error updating Vehicle Insurance - "+data);
                $('#membermanageVehicleInsuranceDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteMemberVehicleInsurance() {
        var qdata = 'memberid='+$scope.current.memberid+'&insuranceid='+$scope.current.insuranceid+"&insurancename="+$scope.current.insurancename;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deletememberVehicleInsurance(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.insuranceid = data.insuranceid;
                $scope.current.insurancename = data.insurancename;

                $('#membermanageVehicleInsuranceDialogModalTitle').text("Member Vehicle Insurance Delete Success");
                $('#membermanageVehicleInsuranceDialogModalBody').html("Vehicle Insurance information deleted succesfully for Vehicle Insurance <span style='color:teal;font-weight:700'>"+$scope.current.insurancename+"</span>!");
                $('#membermanageVehicleInsuranceDialogModal').modal();

                $scope.current.insurancename = "";
                $scope.current.insuranceid = "";

                resetMemberVehicleInsuranceForm();
                getMemberVehicleInsurances();
            }
            else
            {
                $('#membermanageVehicleInsuranceDialogModalTitle').text("Member Vehicle Insurance Delete Error");
                $('#membermanageVehicleInsuranceDialogModalBody').text("Error deleting Vehicle Insurance - "+data);
                $('#membermanageVehicleInsuranceDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
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

    $scope.updateMemberVehicleInsurance = function() {
        updateMemberVehicleInsurance(insuranceid);
    }

    $scope.newInsurance = function () {
        resetMemberVehicleInsuranceForm();
    }

    $scope.deleteMemberVehicleInsurance = function () {
        deleteMemberVehicleInsurance();
    }
}

controllers.membermanagevehicleroadsideassistanceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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
        // $scope.current.roadsideassistanceid = roadsideassistanceid;
        // console.log("insuranceid get:"+insuranceid);

        for (var i = 0; i < $scope.roadsideassistances.length; i++)
        {
            if ($scope.roadsideassistances[i].id == id)
            {
                $scope.roadsideassistance = $scope.roadsideassistances[i];
                // $scope.current.roadsideassistancename = $scope.roadsideassistances[i].roadsideassistancename;
                // console.log($scope.current.waypoint);
            }
        }
    }

    function updateMemberVehicleRoadsideAssistance() {
        var formstring = $("#membermanagevehicleroadsideassistanceForm").serialize();
        // console.log(formstring);

        memberFactory.saveMembervehicleroadsideassistance(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                // $scope.current.roadsideassistanceid = data.roadsideassistanceid;
                // $scope.current.roadsideassistancename = data.roadsideassistancename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Success");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').html("Vehicle information updated succesfully for Roadside Assitance <span style='color:teal;font-weight:700'>"+data.roadsideassistancename+"</span>");
                $('#membermanageVehicleRoadsideAssistanceDialogModal').modal();
 
                // $scope.roadsideassistances = "";

                resetMemberRoadsideAssistanceForm();
            }
            else
            {
                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Error");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').text("Error updating Roadside Assitance - "+data);
                $('#membermanageVehicleRoadsideAssistanceDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    
    function deletememberVehicleRoadsideAssistance() {
        var qdata = 'memberid='+$scope.current.memberid+'&roadsideassistanceid='+$scope.roadsideassistance.id+"&roadsideassistancename="+$scope.roadsideassistance.roadsideassistancename;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deletememberVehicleRoadsideAssistance(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                // $scope.current.roadsideassistanceid = data.roadsideassistanceid;
                // $scope.current.roadsideassistancename = data.roadsideassistancename;

                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Success");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').html("Roadside Assitance information deleted succesfully for <span style='color:teal;font-weight:700'>"+data.roadsideassistancename+"</span>!");
                $('#membermanageVehicleRoadsideAssistanceDialogModal').modal();

                // $scope.current.roadsideassistanceid = "";
                // $scope.current.roadsideassistancename = "";

                resetMemberRoadsideAssistanceForm();
            }
            else
            {
                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Error");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').text("Error deleting Roadside Assitance- "+data);
                $('#membermanageVehicleRoadsideAssistanceDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
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

    $scope.updateMemberVehicleRoadsideAssistance = function() {
        updateMemberVehicleRoadsideAssistance();
    }

    $scope.NewRoadsideAssistance = function () {
        resetMemberRoadsideAssistanceForm();
    }

    $scope.deletememberVehicleRoadsideAssistance = function () {
        deletememberVehicleRoadsideAssistance();
    }
}

controllers.membermanagegasController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                getMemberTripGasDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripGasDetails() {
        $scope.gasdetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripgasdetails(qdata)
            .success( function(data) {
                $scope.gasdetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function validateForm() {
        var errmsg = "";
        if (!positiveDecimalPostValidation($scope.current.gasdetail.odometer))
        {
            errmsg += "Odometer must be a valid number! <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.gasdetail.amount))
        {
            errmsg += "Amount must be a valid number!  <br><br>";
        }

        if (!positiveDecimalPostValidation($scope.current.gasdetail.gallons))
        {
            errmsg += "Gallons must be a valid number!   <br>";
        }

        if (!isValidDate($scope.current.gasdetail.date))
        {
            errmsg += "Date must be a valid date! <br><br>";
            $scope.current.trip.startdate = "";
        }

        return errmsg;
    }

    function saveGasDetail() {

        // 
        // Validate values
        // 
        
        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#memEntryGasDialogModalTitle').text("The Following errors must be fixed");
            $('#memEntryGasDialogModalBody').html(retmsg);
            $('#memEntryGasDialogModal').modal();

            return;
        }

        var formstring = $("#membergasdetailForm").serialize();

        memberFactory.saveMembergastripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.func = "save";

                capturegasRecalculate();
            }
            else
            {
                $('#memEntryGasDialogModalTitle').text("Gas Trip Update Error");
                $('#memEntryGasDialogModalBody').html("Error saving gas trip entry - "+data);
                $('#memEntryGasDialogModal').modal();
            }

            // must call for new totals and reload scope.current.original.gastotals
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function capturegasRecalculate() {
        // console.log(formstring);

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid;
        memberFactory.capturegasRecalculate(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                switch ($scope.current.func) 
                {
                    case 'save':
                        $('#memEntryGasDialogModalTitle').text("Gas Trip Update Success");
                        $('#memEntryGasDialogModalBody').html(data.bodytext);
                        $('#memEntryGasDialogModal').modal();
                        break;

                    case 'delete':
                        $('#memEntryGasDialogModalTitle').text("Gas Trip Detail Entry Delete Success");
                        $('#memEntryGasDialogModalBody').html(data.bodytext);
                        $('#memEntryGasDialogModal').modal();
                        break;    
                }

                resetGasDetailUpdate();
            }
            else
            {
                switch ($scope.current.func) 
                {
                    case 'save':
                        $('#memEntryGasDialogModalTitle').text("Gas Trip Update Error");
                        $('#memEntryGasDialogModalBody').html("Error saving gas trip entry - "+data);
                        $('#memEntryGasDialogModal').modal();
                        break;

                    case 'delete':
                        $('#memEntryGasDialogModalTitle').text("Gas Trip Detail Entry Delete Error");
                        $('#memEntryGasDialogModalBody').html("Error deleting detail entry - "+data);
                        $('#memEntryGasDialogModal').modal();
                        break;    
                }     
            }

            $scope.current.func = "";

            // must call for new totals and reload scope.current.original.gastotals
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function resetGasDetailUpdate() {
        $scope.membertrips = {};
        $scope.current.gasdetail = {};

        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function deleteGasDetail() {

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&detailid='+$scope.current.gasdetail.id;

        // console.log("trip form delete:"+qdata);

        memberFactory.deleteMembergastripentry(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.gasdetail.id = "";
                $scope.current.func = "delete";

                capturegasRecalculate();
            }
            else
            {
                $('#memEntryGasDialogModalTitle').text("Gas Trip Detail Entry Delete Error");
                $('#memEntryGasDialogModalBody').text("Error deleting trip entry detail- "+data);
                $('#memEntryGasDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });

    }

    function resetGasDetailAdd() {
        $scope.current.gasdetail.id = "";
        $('#detailid').val("");

        saveGasDetail();
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
        $scope.current.func = "";

        resetGasDetailUpdate();
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

    $scope.getMemberTripGasDetails = function () {
        getMemberTripGasDetails();
    }

    $scope.setCurrentTrip = function (gasdetail) {
        $scope.current.gasdetail = objectCopy(gasdetail);
    }

    $scope.resetGasDetailUpdate = function () {
        resetGasDetailUpdate();
    }

    $scope.resetGasDetailAdd = function() {
        resetGasDetailAdd();
    }

    $scope.saveGasDetail = function () {
        saveGasDetail();
    }

    $scope.deleteGasDetail = function () {
        deleteGasDetail();
    }
}

controllers.membermanagervmembershipController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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
        // $scope.current.rvmembershipid = rvmembershipid;
        // console.log("insuranceid get:"+insuranceid);

        for (var i = 0; i < $scope.rvmemberships.length; i++)
        {
            if ($scope.rvmemberships[i].id == id)
            {
                $scope.rvmembership = $scope.rvmemberships[i];
            }
        }
    }

    function updateMemberRVmembership() {
        var formstring = $("#membermanagerrvmembershipForm").serialize();
        // console.log(formstring);

        memberFactory.saveMemberRVmembership(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                // $scope.current.rvmembershipid = data.rvmembershipid;
                // $scope.current.rvmembershipname = data.rvmembershipname;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#membermanageRvMembershipDialogModalTitle').text("Member RV Membership Success");
                $('#membermanageRvMembershipDialogModalBody').html("RV Membership information saved succesfully for RV Membership <span style='color:teal;font-weight:700'>"+data.rvmembershipname+"</span>");
                $('#membermanageRvMembershipDialogModal').modal();
 
                // $scope.roadsideassistances = "";

                resetMemberRVmembershipForm();
            }
            else
            {
                $('#membermanageRvMembershipDialogModalTitle').text("Member RV Membership Error");
                $('#membermanageRvMembershipDialogModalBody').text("Error updating RV Membership - "+data);
                $('#membermanageRvMembershipDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    
    function deleteMemberRVmembership() {
        var qdata = 'memberid='+$scope.current.memberid+'&id='+$scope.rvmembership.id+"&rvmembershipname="+$scope.rvmembership.rvmembershipname;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deleteMemberRVmembership(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                // $scope.current.rvmembershipid = data.rvmembershipid;
                // $scope.current.rvmembershipname = data.rvmembershipname;


                $('#membermanageRvMembershipDialogModalTitle').text("RV Membership information Delete Success");
                $('#membermanageRvMembershipDialogModalBody').html("RV Membership information deleted succesfully for <span style='color:teal;font-weight:700'>"+data.rvmembershipname+"</span>!");
                $('#membermanageRvMembershipDialogModal').modal();

                // $scope.current.roadsideassistanceid = "";
                // $scope.current.roadsideassistancename = "";

                resetMemberRVmembershipForm();
            }
            else
            {
                $('#membermanageRvMembershipDialogModalTitle').text("RV Membership Delete Error");
                $('#membermanageRvMembershipDialogModalBody').text("Error deleting Roadside Assitance- "+data);
                $('#membermanageRvMembershipDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
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

    $scope.updateMemberRVmembership = function() {
        updateMemberRVmembership();
    }

    $scope.NewMemberRVmembership = function () {
        resetMemberRVmembershipForm();
    }

    $scope.deleteMemberRVmembership = function () {
        deleteMemberRVmembership();
    }
}

controllers.membermanageeventController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                getMemberTripEventDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripEventDetails() {
        $scope.eventdetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripeventdetails(qdata)
            .success( function(data) {
                $scope.eventdetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function resetEventDetail() {
        $scope.membertrips = {};
        $scope.current.eventdetail = {};

        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function validateForm() {
        var errmsg = "";
        
        if (!isValidDate($scope.current.eventdetail.date))
        {
            errmsg += "Date must be a valid date! <br><br>";
            $scope.current.eventdetail.date = "";
        }

        return errmsg;
    }

    function saveEventDetail() {

        // 
        // Validate values
        // 
        
        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#memEntryEventDialogModalTitle').text("The Following errors must be fixed");
            $('#memEntryEventDialogModalBody').html(retmsg);
            $('#memEntryEventDialogModal').modal();
            return;
        }

        var formstring = $("#membereventdetailForm").serialize();
        memberFactory.saveMembereventtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memEntryEventDialogModalTitle').text("Special Event Update Success");
                $('#memEntryEventDialogModalBody').html(data.bodytext);
                $('#memEntryEventDialogModal').modal();

                resetEventDetail();
            }
            else
            {
                $('#memEntryEventDialogModalTitle').text("Special Event Update Error");
                $('#memEntryEventDialogModalBody').html("Error saving gas trip entry - "+data);
                $('#memEntryEventDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteEventDetail() {

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&id='+$scope.current.eventdetail.id;
        memberFactory.deleteMembereventtripentry(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.eventdetail.id = "";

                $('#memEntryEventDialogModalTitle').text("Special Event Delete Success");
                $('#memEntryEventDialogModalBody').html(data.bodytext);
                $('#memEntryEventDialogModal').modal();

                resetEventDetail();
            }
            else
            {
                $('#memEntryEventDialogModalTitle').text("Special Event Detail Delete Error");
                $('#memEntryEventDialogModalBody').text("Error deleting event entry detail- "+data);
                $('#memEntryEventDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });

    }

    function addEventDetail() {
        $scope.current.eventdetail.id = "";
        $('#id').val("");

        saveEventDetail();
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

        resetEventDetail();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

    $scope.getMemberTripEventDetails = function () {
        getMemberTripEventDetails();
    }

    $scope.setCurrentTrip = function (eventdetail) {
        $scope.current.eventdetail = objectCopy(eventdetail);
    }

    $scope.resetEventDetail = function () {
        resetEventDetail();
    }

    $scope.addEventDetail = function() {
        addEventDetail();
    }

    $scope.saveEventDetail = function () {
        saveEventDetail();
    }

    $scope.deleteEventDetail = function () {
        deleteEventDetail();
    }

}

controllers.membermanagefoodController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                getMemberTripFoodDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripFoodDetails() {
        $scope.fooddetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripfooddetails(qdata)
            .success( function(data) {
                $scope.fooddetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function resetFoodDetail() {
        $scope.membertrips = {};
        $scope.current.fooddetail = {};

        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function validateForm() {
        var errmsg = "";
        
        if (!isValidDate($scope.current.fooddetail.date))
        {
            errmsg += "Date must be a valid date! <br><br>";
            $scope.current.fooddetail.date = "";
        }

        return errmsg;
    }

    function saveFoodDetail() {
        // 
        // Validate values
        // 
        
        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#memEntryFoodDialogModalTitle').text("The Following errors must be fixed");
            $('#memEntryFoodDialogModalBody').html(retmsg);
            $('#memEntryFoodDialogModal').modal();
            return;
        }

        var formstring = $("#memberfooddetailForm").serialize();
        memberFactory.saveMemberfoodtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memEntryFoodDialogModalTitle').text("Restaurant Update Success");
                $('#memEntryFoodDialogModalBody').html(data.bodytext);
                $('#memEntryFoodDialogModal').modal();

                resetFoodDetail();
            }
            else
            {
                $('#memEntryFoodDialogModalTitle').text("Restaurant Update Error");
                $('#memEntryFoodDialogModalBody').html("Error saving gas trip entry - "+data);
                $('#memEntryFoodDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteFoodDetail() {

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&id='+$scope.current.fooddetail.id;
        memberFactory.deleteMemberfoodtripentry(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.fooddetail.id = "";

                $('#memEntryFoodDialogModalTitle').text("Restaurant Delete Success");
                $('#memEntryFoodDialogModalBody').html(data.bodytext);
                $('#memEntryFoodDialogModal').modal();

                resetFoodDetail();
            }
            else
            {
                $('#memEntryFoodDialogModalTitle').text("Restaurant Detail Delete Error");
                $('#memEntryFoodDialogModalBody').text("Error deleting event entry detail- "+data);
                $('#memEntryFoodDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });

    }

    function addFoodDetail() {
        $scope.current.fooddetail.id = "";
        $('#id').val("");

        saveFoodDetail();
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

        resetFoodDetail();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

    $scope.getMemberTripFoodDetails = function () {
        getMemberTripFoodDetails();
    }

    $scope.setCurrentTrip = function (fooddetail) {
        $scope.current.fooddetail = objectCopy(fooddetail);
    }

    $scope.resetFoodDetail = function () {
        resetFoodDetail();
    }

    $scope.addFoodDetail = function() {
        addFoodDetail();
    }

    $scope.saveFoodDetail = function () {
        saveFoodDetail();
    }

    $scope.deleteFoodDetail = function () {
        deleteFoodDetail();
    }

}

controllers.membermanageovernightController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                getMemberTripOvernightDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripOvernightDetails() {
        $scope.overnightdetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripovernightdetails(qdata)
            .success( function(data) {
                $scope.overnightdetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function resetOvernightDetail() {
        $scope.membertrips = {};
        $scope.current.overnightdetail = {};

        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function validateForm() {
        var errmsg = "";
        
        if (!isEmpty($scope.current.overnightdetail.datein))
        {
            if (!isValidDate($scope.current.overnightdetail.datein))
            {
                errmsg += "Date In must be a valid date! <br><br>";
                $scope.current.overnightdetail.datein = "";
            }
        }
            
        if (!isEmpty($scope.current.overnightdetail.dateout))
        {
            if (!isValidDate($scope.current.overnightdetail.dateout))
            {
                errmsg += "Date Out must be a valid date! <br><br>";
                $scope.current.overnightdetail.dateout = "";
            }
        }
       
        return errmsg;
    }

    function saveOvernightDetail() {
        // 
        // Validate values
        // 
        
        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#memEntryOvernightDialogModalTitle').text("The Following errors must be fixed");
            $('#memEntryOvernightDialogModalBody').html(retmsg);
            $('#memEntryOvernightDialogModal').modal();
            return;
        }

        var formstring = $("#memberovernightdetailForm").serialize();
        memberFactory.saveMemberovernighttripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memEntryOvernightDialogModalTitle').text("Overnight Update Success");
                $('#memEntryOvernightDialogModalBody').html(data.bodytext);
                $('#memEntryOvernightDialogModal').modal();

                resetOvernightDetail();
            }
            else
            {
                $('#memEntryOvernightDialogModalTitle').text("Overnight Update Error");
                $('#memEntryOvernightDialogModalBody').html("Error saving gas trip entry - "+data);
                $('#memEntryOvernightDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteOvernightDetail() {

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&id='+$scope.current.overnightdetail.id;
        memberFactory.deleteMemberovernighttripentry(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.overnightdetail.id = "";

                $('#memEntryOvernightDialogModalTitle').text("Overnight Delete Success");
                $('#memEntryOvernightDialogModalBody').html(data.bodytext);
                $('#memEntryOvernightDialogModal').modal();

                resetOvernightDetail();
            }
            else
            {
                $('#memEntryOvernightDialogModalTitle').text("Overnight Detail Delete Error");
                $('#memEntryOvernightDialogModalBody').text("Error deleting overnight entry detail- "+data);
                $('#memEntryOvernightDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });

    }

    function addOvernightDetail() {
        $scope.current.overnightdetail.id = "";
        $('#id').val("");

        saveOvernightDetail();
    }

    init();
    function init() {
        //
        // this is not getting called at right time for definig top offset
        // in jquery ready. So adding it here
        //
        setviewpadding();

        $scope.states = selectListService.getList('states');
        $scope.typestays = selectListService.getList('typestay');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
        $scope.current.tripid = "";

        resetOvernightDetail();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.dollarRealtimeValidation = function (e) {
        dollarRealtimeValidation(e);
    }

    $scope.getMemberTripOvernightDetails = function () {
        getMemberTripOvernightDetails();
    }

    $scope.setCurrentTrip = function (overnightdetail) {
        $scope.current.overnightdetail = objectCopy(overnightdetail);
    }

    $scope.resetOvernightDetail = function () {
        resetOvernightDetail();
    }

    $scope.addOvernightDetail = function() {
        addOvernightDetail();
    }

    $scope.saveOvernightDetail = function () {
        saveOvernightDetail();
    }

    $scope.deleteOvernightDetail = function () {
        deleteOvernightDetail();
    }

    $scope.checkBoxValue = function (field) {
        var check = $("#"+field).val();
        if (check == "on")
        {
            $("#"+field).val("1");
        }
    }
}

controllers.membermanagefriendController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                getMemberTripFriendDetails();
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripFriendDetails() {
        $scope.frienddetails = {};

        $order = "DESC";

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&order='+$order;
        memberFactory.getMembertripfrienddetails(qdata)
            .success( function(data) {
                $scope.frienddetails = objectCopy(data);
            })
            .error( function(edata) {
                alert(edata);
            });
    }

    function resetFriendDetail() {
        $scope.membertrips = {};
        $scope.current.frienddetail = {};

        $scope.current.email = $scope.current.memberlogin.email;

        getMemberTrips();
        getMemberTrip();
    }

    function validateForm() {
        var errmsg = "";
        
        if (!isValidDate($scope.current.frienddetail.date))
        {
            errmsg += "Date must be a valid date! <br><br>";
            $scope.current.frienddetail.date = "";
        }

        return errmsg;
    }

    function saveFriendDetail() {
        // 
        // Validate values
        // 
        
        var retmsg = validateForm();
        if (retmsg != "")
        {
            $('#memEntryFriendDialogModalTitle').text("The Following errors must be fixed");
            $('#memEntryFriendDialogModalBody').html(retmsg);
            $('#memEntryFriendDialogModal').modal();
            return;
        }

        var formstring = $("#memberfrienddetailForm").serialize();
        memberFactory.saveMemberfriendtripentry(formstring)
        .success( function(data) {
            if (data.errtext == "")
            {
                $('#memEntryFriendDialogModalTitle').text("Friend Update Success");
                $('#memEntryFriendDialogModalBody').html(data.bodytext);
                $('#memEntryFriendDialogModal').modal();

                resetFriendDetail();
            }
            else
            {
                $('#memEntryFriendDialogModalTitle').text("Friend Update Error");
                $('#memEntryFriendDialogModalBody').html("Error saving gas trip entry - "+data);
                $('#memEntryFriendDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteFriendDetail() {

        var qdata = 'tripid='+$scope.current.tripid+'&memberid='+$scope.current.memberid+'&id='+$scope.current.frienddetail.id;
        memberFactory.deleteMemberfriendtripentry(qdata)
        .success( function(data) {
            if (data.errtext == "")
            {
                $scope.current.frienddetail.id = "";

                $('#memEntryFriendDialogModalTitle').text("Friend Delete Success");
                $('#memEntryFriendDialogModalBody').html(data.bodytext);
                $('#memEntryFriendDialogModal').modal();

                resetFriendDetail();
            }
            else
            {
                $('#memEntryFriendDialogModalTitle').text("Friend Detail Delete Error");
                $('#memEntryFriendDialogModalBody').text("Error deleting event entry detail- "+data);
                $('#memEntryFriendDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });

    }

    function addFriendDetail() {
        $scope.current.frienddetail.id = "";
        $('#id').val("");

        saveFriendDetail();
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

        resetFriendDetail();
    };

    $scope.odometerRealtimeValidation = function (e) {
        odometerRealtimeValidation(e);
    }

    $scope.getMemberTripFriendDetails = function () {
        getMemberTripFriendDetails();
    }

    $scope.setCurrentTrip = function (frienddetail) {
        $scope.current.frienddetail = objectCopy(frienddetail);
    }

    $scope.resetFriendDetail = function () {
        resetFriendDetail();
    }

    $scope.addFriendDetail = function() {
        addFriendDetail();
    }

    $scope.saveFriendDetail = function () {
        saveFriendDetail();
    }

    $scope.deleteFriendDetail = function () {
        deleteFriendDetail();
    }

}
