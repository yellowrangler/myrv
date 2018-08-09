controllers.membersetupmemberController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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
            var formstring = $("#membersetupmemberForm").serialize();
            // var formstringClean = encodeURIComponent(formstring);

            memberFactory.membersetupMember(formstring)
            .success( function(data) {
                if (data == "ok")
                {
                    $('#memberSetupMemberDialogModalTitle').text("Member Update Success");
                    $('#memberSetupMemberDialogModalBody').text("Member "+$scope.current.membername+" updated succesfully!");
                    $('#memberSetupMemberDialogModal').modal();
                }
                else
                {
                    $('#memberSetupMemberDialogModalTitle').text("Member Update Error");
                    $('#memberSetupMemberDialogModalBody').text("Error updating member - "+data);
                    $('#memberSetupMemberDialogModal').modal();
                }
            })
            .error( function(edata) {
                alert(edata);
            });
        }
    }

    $scope.updateAvatar = function() {
        $('#meberSetupMemberDialogModalTitle').text("Update Avatar Information");
        $('#meberSetupMemberDialogModalBody').html("<center>At this time please send me your Avatar via eMail! <BR />We will open this up some day.</center>");
        $('#meberSetupMemberDialogModal').modal();
    }
}

controllers.membersetuptripController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

                $scope.membertripwaypoints = "";
                resetTripWaypointForm();

                getMemberTripWaypoints();
            }
        }
    }

    function getMemberTrips() {

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMembertrips(qdata)
            .success( function(data) {
                $scope.membertrips = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function updateMemberTrip() {

        var formstring = $("#membersetuptripForm").serialize();
            // var formstringClean = encodeURIComponent(formstring);

        // console.log("trip form serialize:"+formstring);

        memberFactory.savememberTrip(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.tripid = data.tripid;
                $scope.current.tripname = data.tripname;

                $('#tripSetupMemberDialogModalTitle').text("Member Trip Update Success");
                $('#tripSetupMemberDialogModalBody').html("Trip information updated succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                $('#tripSetupMemberDialogModal').modal();

                // resetTripWaypointForm()
                // resetTripForm();

                getMemberTrips();
            }
            else
            {
                $('#tripSetupMemberDialogModalTitle').text("Member Trip Update Error");
                $('#tripSetupMemberDialogModalBody').text("Error updating trip - "+data);
                $('#tripSetupMemberDialogModal').modal();
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

                $('#tripSetupMemberDialogModalTitle').text("Member Trip Delete Success");
                $('#tripSetupMemberDialogModalBody').html("Trip information deleted succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                $('#tripSetupMemberDialogModal').modal();

                resetTripWaypointForm()
                resetTripForm();

                getMemberTrips();
            }
            else
            {
                $('#tripSetupMemberDialogModalTitle').text("Member Trip Delete Error");
                $('#tripSetupMemberDialogModalBody').text("Error updating trip - "+data);
                $('#tripSetupMemberDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
     }

    function resetTripForm() {
        // $("#membersetuptripForm")[0].reset();

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
        $scope.current.email = $scope.current.memberlogin.email;

        $scope.current.tripid = "";
        $scope.current.tripname = "";
        $scope.current.trip = "";

        resetTripWaypointForm();
    }

    function getMemberTripWaypoints() {
        var qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid;
        memberFactory.getMembertripwaypoints(qdata)
            .success( function(data) {
                $scope.membertripwaypoints = data;

                // console.log("getMemberTripWaypoints start:");
                // console.log($scope.membertripwaypoints);
                // console.log("getMemberTripWaypoints end:");
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripWaypoint(waypointid) {
        $scope.current.waypointid = waypointid;
        // console.log("wapoint get:"+waypointid);

        for (var i = 0; i < $scope.membertripwaypoints.length; i++)
        {
            if ($scope.membertripwaypoints[i].id == waypointid)
            {
                $scope.current.waypoint = $scope.membertripwaypoints[i];
                $scope.current.waypointname = $scope.membertripwaypoints[i].waypointname;

                // console.log($scope.current.waypoint);
            }
        }
    }

    function resetTripWaypointForm() {
        // $("#membersetuptripwaypointForm")[0].reset();

        $scope.current.waypointid ="";
        $scope.current.waypointname ="";
        $scope.current.waypoint ="";
    }

    function updateMemberTripWaypoint() {

        var formstring = $("#membersetuptripwaypointForm").serialize();
        // var formstringClean = encodeURIComponent(formstring);

        // console.log(formstring);

        memberFactory.savememberTripWaypoint(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.waypointid = data.waypointid;
                $scope.current.waypointname = data.waypointname;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#tripSetupMemberDialogModalTitle').text("Member Trip Waypoint Update Success");
                $('#tripSetupMemberDialogModalBody').html("Trip Waypoint information updated succesfully for Waypoint <span style='color:teal;font-weight:700'>"+$scope.current.waypointname+"</span>!");
                $('#tripSetupMemberDialogModal').modal();

                $scope.membertripwaypoints = "";

                resetTripWaypointForm();
                getMemberTripWaypoints();
            }
            else
            {
                $('#tripSetupMemberDialogModalTitle').text("Member TripWaypoint Error");
                $('#tripSetupMemberDialogModalBody').text("Error updating trip waypoint - "+data);
                $('#tripSetupMemberDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function DeleteMemberTripWaypoint() {
        var qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid+"&waypointid="+$scope.current.waypointid+"&waypointname="+$scope.current.waypointname;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deletememberTripWaypoint(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.waypointid = data.waypointid;
                $scope.current.waypointname = data.waypointname;

                $('#tripSetupMemberDialogModalTitle').text("Member Trip Waypoint Delete Success");
                $('#tripSetupMemberDialogModalBody').html("Trip Waypoint information deleted succesfully for Waypoint <span style='color:teal;font-weight:700'>"+$scope.current.waypointname+"</span>!");
                $('#tripSetupMemberDialogModal').modal();

                $scope.current.waypointid = "";
                $scope.current.waypointname = "";

                resetTripWaypointForm();
                getMemberTripWaypoints();
            }
            else
            {
                $('#tripSetupMemberDialogModalTitle').text("Member Trip Waypoint Delete Error");
                $('#tripSetupMemberDialogModalBody').text("Error deleting trip waypoint - "+data);
                $('#tripSetupMemberDialogModal').modal();
            }
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
        $scope.membertrips = "";
        $scope.membertripwaypoints = "";

        $scope.current.tripname = "";
        $scope.current.tripid = "";

        $scope.current.waypointid = "";
        $scope.current.waypointname = "";

        $scope.current.email = $scope.current.memberlogin.email;

        getMembertowvehicles();
        getMemberrvehicles();

        getMemberTrips();
    };

    $scope.getMemberTrip = function (tripid) {
        getMemberTrip(tripid);
    }

    $scope.newTrip = function () {
        resetTripWaypointForm();
        resetTripForm();
    }

    $scope.newTripWaypoint = function () {
        resetTripWaypointForm();
    }

    $scope.updateMemberTrip = function () {
        updateMemberTrip();
    }

    $scope.DeleteMemberTrip = function () {
        DeleteMemberTrip();
    }

    $scope.getMemberTripWaypoint = function (tripid, waypointid) {
        getMemberTripWaypoint(waypointid);
    }
    
    $scope.updateMemberTripWaypoint = function () {
        updateMemberTripWaypoint();
    }

    $scope.DeleteMemberTripWaypoint = function() {
        DeleteMemberTripWaypoint();
    }

  }

  controllers.membersetupvehiclervController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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
       
        vehiclename = vehicle.type+" "+vehicle.make+" "+vehicle.model+" "+vehicle.color+" "+vehicle.year+" "+vehicle.platenbr;

        return vehiclename;
    }
    
    function updateMemberVehicle(vehicleid) {
        var formstring = $("#membersetupvehicleForm").serialize();

        // console.log(formstring);

        memberFactory.savememberVehicle(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.vehicleid = data.vehicleid;
                $scope.current.vehiclename = data.vehiclename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#memberSetupVehicleDialogModalTitle').text("Member Update Vehicle Success");
                $('#memberSetupVehicleDialogModalBody').html("Vehicle information updated succesfully for Vehicle <span style='color:teal;font-weight:700'>"+$scope.current.vehiclename+"</span>");
                $('#memberSetupVehicleDialogModal').modal();
 
                $scope.membervehicles = "";

                resetMemberVehicleForm();
                getMemberVehicles();
            }
            else
            {
                $('#memberSetupVehicleDialogModalTitle').text("Member Update Vehicle Error");
                $('#memberSetupVehicleDialogModalBody').text("Error updating Vehicle - "+data);
                $('#memberSetupVehicleDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    function deleteMemberVehicle() {
        var qdata = 'memberid='+$scope.current.memberid+'&vehicleid='+$scope.current.vehicleid+"&vehiclename="+$scope.current.vehiclename;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deletememberVehicle(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.vehicleid = data.vehicleid;
                $scope.current.vehiclename = data.vehiclename;

                $('#memberSetupVehicleDialogModalTitle').text("Member Vehicle Delete Success");
                $('#memberSetupVehicleDialogModalBody').html("Vehicle information deleted succesfully for Vehicle <span style='color:teal;font-weight:700'>"+$scope.current.vehiclename+"</span>!");
                $('#memberSetupVehicleDialogModal').modal();

                $scope.current.vehicleid = "";
                $scope.current.vehiclename = "";

                resetMemberVehicleForm();
                getMemberVehicles();
            }
            else
            {
                $('#memberSetupVehicleDialogModalTitle').text("Member Vehicle Delete Error");
                $('#memberSetupVehicleDialogModalBody').text("Error deleting Vehicle - "+data);
                $('#memberSetupVehicleDialogModal').modal();
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

controllers.membersetupvehicleinsuranceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
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

    function updateMemberVehicleInsurance(insuranceid) {
        var formstring = $("#membersetupvehicleinsuranceForm").serialize();

        // console.log(formstring);

        memberFactory.saveMembervehicleinsurance(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.insuranceid = data.insuranceid;
                $scope.current.insurancename = data.insurancename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#memberSetupVehicleInsuranceDialogModalTitle').text("Member Update Vehicle Insurance Success");
                $('#memberSetupVehicleInsuranceDialogModalBody').html("Vehicle information updated succesfully for Vehicle Insurance <span style='color:teal;font-weight:700'>"+$scope.current.insurancename+"</span>");
                $('#memberSetupVehicleInsuranceDialogModal').modal();
 
                $scope.membertripwaypoints = "";

                resetMemberVehicleInsuranceForm();
                getMemberVehicleInsurances();
            }
            else
            {
                $('#memberSetupVehicleInsuranceDialogModalTitle').text("Member Update Vehicle Insurance Error");
                $('#memberSetupVehicleInsuranceDialogModalBody').text("Error updating Vehicle Insurance - "+data);
                $('#memberSetupVehicleInsuranceDialogModal').modal();
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

    $scope.updateMemberVehicleInsurance = function(insuranceid) {
        updateMemberVehicleInsurance(insuranceid);
    }

    $scope.newInsurance = function () {
        resetMemberVehicleInsuranceForm();
    }

    $scope.deleteMemberVehicleIns = function () {
        deleteMemberVehicle();
    }
}

controllers.membersetupvehicleroadsideassistanceController = function ($scope, $http, $location, memberFactory, loginService, selectListService) {
    $scope.current = {};

    function resetMemberRoadsideAssistanceForm() {
        $scope.current.roadsideassistanceid ="";
        $scope.current.roadsideassistancename ="";
        $scope.current.roadsideassistance ="";
    }

    function getMemberVehicleRoadsideAssitances() {
        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMembervehicleroadsideassitances(qdata)
            .success( function(data) {
                $scope.membervehicleroadsideassistances = data;
                })
            .error( function(edata) {
                alert(edata);
            });
    }

    function getMemberVehicleRoadsideAssitance(roadsideassistanceid) {
        $scope.current.roadsideassistanceid = roadsideassistanceid;
        // console.log("insuranceid get:"+insuranceid);

        for (var i = 0; i < $scope.membervehicleroadsideassistances.length; i++)
        {
            if ($scope.membervehicleroadsideassistances[i].id == roadsideassistanceid)
            {
                $scope.current.roadsideassistance = $scope.membervehicleroadsideassistances[i];
                $scope.current.roadsideassistancename = $scope.membervehicleroadsideassistances[i].roadsideassistancename;
                // console.log($scope.current.waypoint);
            }
        }
    }

    function updateMemberVehicleRoadsideAssistance(roadsideassistanceid) {
        var formstring = $("#membersetupvehicleroadsideassistanceForm").serialize();
        // console.log(formstring);

        memberFactory.saveMembervehicleroadsideassistanceid(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.roadsideassistanceid = data.roadsideassistanceid;
                $scope.current.roadsideassistancename = data.roadsideassistancename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#memberSetupVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Success");
                $('#memberSetupVehicleRoadsideAssistanceDialogModalBody').html("Vehicle information updated succesfully for Roadside Assitance <span style='color:teal;font-weight:700'>"+$scope.current.roadsideassistancename+"</span>");
                $('#memberSetupVehicleRoadsideAssistanceeDialogModal').modal();
 
                $scope.membervehicleroadsideassistances = "";

                resetMemberRoadsideAssistanceForm();
                getMemberRoadsideAssistances();
            }
            else
            {
                $('#memberSetupVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Error");
                $('#memberSetupVehicleRoadsideAssistanceDialogModalBody').text("Error updating Roadside Assitance - "+data);
                $('#memberSetupVehicleRoadsideAssistanceeDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    
    function deletememberVehicleRoadsideAssistance() {
        var qdata = 'memberid='+$scope.current.memberid+'&roadsideassistanceid='+$scope.current.roadsideassistanceid+"&roadsideassistancename="+$scope.current.roadsideassistancename;

        // console.log("after return waypointid="+$scope.current.waypointid);

        memberFactory.deletememberVehicleRoadsideAssistance(qdata)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.roadsideassistanceid = data.roadsideassistanceid;
                $scope.current.roadsideassistancename = data.roadsideassistancename;

                $('#memberSetupVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Success");
                $('#memberSetupVehicleRoadsideAssistanceDialogModalBody').html("Roadside Assitance information deleted succesfully for Vehicle insurance <span style='color:teal;font-weight:700'>"+$scope.current.roadsideassistancename+"</span>!");
                $('#memberSetupVehicleRoadsideAssistanceeDialogModal').modal();

                $scope.current.roadsideassistanceid = "";
                $scope.current.roadsideassistancename = "";

                resetMemberRoadsideAssistanceForm();
                getMemberRoadsideAssistances();
            }
            else
            {
                $('#memberSetupVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Error");
                $('#memberSetupVehicleRoadsideAssistanceDialogModalBody').text("Error deleting Roadside Assitance- "+data);
                $('#memberSetupVehicleRoadsideAssistanceeDialogModal').modal();
            }
        })
        .error( function(edata) {
            alert(edata);
        });
    }

    init();
    function init() {
        setviewpadding();

        $scope.roadsideassistancestatus = selectListService.getList('memberstatusList');

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;

        $scope.membervehicleroadsideassistances = "";

        getMemberVehicleInsurances();
    };

    $scope.getMemberVehicleRoadsideAssitance = function(roadsideassistanceid) {
        getMemberVehicleRoadsideAssitance(roadsideassistanceid);
    }

    $scope.updateMemberVehicleRoadsideAssistance = function(roadsideassistanceid) {
        updateMemberVehicleRoadsideAssistance(roadsideassistanceid);
    }

    $scope.NewRoadsideAssistance = function () {
        resetMemberRoadsideAssistanceForm();
    }

    $scope.deletememberVehicleRoadsideAssistance = function () {
        deletememberVehicleRoadsideAssistance();
    }
}
