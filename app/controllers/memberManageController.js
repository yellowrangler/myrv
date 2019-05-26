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
        memberFactory.getMembertrips(qdata)
            .success( function(data) {
                $scope.membertrips = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function saveMemberTrip() {

        var formstring = $("#membermanagetripForm").serialize();
        // var formstringClean = encodeURIComponent(formstring);

        // console.log("trip form serialize:"+formstring);

        memberFactory.savememberTrip(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.tripid = data.tripid;
                $scope.current.tripname = data.tripname;

                $('#tripmanageMemberDialogModalTitle').text("Member Trip Update Success");
                $('#tripmanageMemberDialogModalBody').html("Trip information updated succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                $('#tripmanageMemberDialogModal').modal();

                getMemberTrips();
            }
            else
            {
                $('#tripmanageMemberDialogModalTitle').text("Member Trip Update Error");
                $('#tripmanageMemberDialogModalBody').text("Error updating trip - "+data);
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

    function odometerChange(name)
    {
        var odometer = 0;

        switch (name) 
        {
            case 'startodometer':
                odometer = $scope.current.trip.startodometer * 1;
                $scope.current.trip.startodometer = odometer.toFixed(1);
                break;

            case 'endodometer':
                odometer = $scope.current.trip.endodometer * 1;
                $scope.current.trip.endodometer = odometer.toFixed(1);
                break;    
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

    $scope.getMemberTrip = function (tripid) {
        getMemberTrip(tripid);
    }

    $scope.newTrip = function () {
        resetTripForm();
    }

    $scope.saveMemberTrip = function () {
        saveMemberTrip();
    }

    $scope.DeleteMemberTrip = function () {
        DeleteMemberTrip();
    }

    $scope.odometerChange = function (name) {
        odometerChange(name);
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

    function updateMemberVehicleRoadsideAssistance() {
        var formstring = $("#membermanagevehicleroadsideassistanceForm").serialize();
        // console.log(formstring);

        memberFactory.saveMembervehicleroadsideassistance(formstring)
        .success( function(data) {
            if (data.msgtext == "ok")
            {
                $scope.current.roadsideassistanceid = data.roadsideassistanceid;
                $scope.current.roadsideassistancename = data.roadsideassistancename;

                // console.log("after return tripid="+$scope.current.tripid);

                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Success");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').html("Vehicle information updated succesfully for Roadside Assitance <span style='color:teal;font-weight:700'>"+$scope.current.roadsideassistancename+"</span>");
                $('#membermanageVehicleRoadsideAssistanceeDialogModal').modal();
 
                $scope.membervehicleroadsideassistances = "";

                resetMemberRoadsideAssistanceForm();
                getMemberVehicleRoadsideAssitances();
            }
            else
            {
                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Update Roadside Assitance Error");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').text("Error updating Roadside Assitance - "+data);
                $('#membermanageVehicleRoadsideAssistanceeDialogModal').modal();
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

                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Success");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').html("Roadside Assitance information deleted succesfully for <span style='color:teal;font-weight:700'>"+$scope.current.roadsideassistancename+"</span>!");
                $('#membermanageVehicleRoadsideAssistanceeDialogModal').modal();

                $scope.current.roadsideassistanceid = "";
                $scope.current.roadsideassistancename = "";

                resetMemberRoadsideAssistanceForm();
                getMemberVehicleRoadsideAssitances();
            }
            else
            {
                $('#membermanageVehicleRoadsideAssistanceDialogModalTitle').text("Member Roadside Assitance Delete Error");
                $('#membermanageVehicleRoadsideAssistanceDialogModalBody').text("Error deleting Roadside Assitance- "+data);
                $('#membermanageVehicleRoadsideAssistanceeDialogModal').modal();
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

        $scope.membervehicleroadsideassistances = "";

        getMemberVehicleRoadsideAssitances();
    };

    $scope.getMemberVehicleRoadsideAssitance = function(roadsideassistanceid) {
        getMemberVehicleRoadsideAssitance(roadsideassistanceid);
    }

    $scope.updateMemberVehicleRoadsideAssistance = function() {
        updateMemberVehicleRoadsideAssistance(roadsideassistanceid);
    }

    $scope.NewRoadsideAssistance = function () {
        resetMemberRoadsideAssistanceForm();
    }

    $scope.deletememberVehicleRoadsideAssistance = function () {
        deletememberVehicleRoadsideAssistance();
    }
}
