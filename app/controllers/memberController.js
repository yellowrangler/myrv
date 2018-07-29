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
                    $('#tripSetupMemberDialogModalTitle').text("Member Update Success");
                    $('#tripSetupMemberDialogModalBody').text("Member "+$scope.current.membername+" updated succesfully!");
                    $('#tripSetupMemberDialogModal').modal();
                }
                else
                {
                    $('#tripSetupMemberDialogModalTitle').text("Member Update Error");
                    $('#tripSetupMemberDialogModalBody').text("Error updating member - "+data);
                    $('#tripSetupMemberrDialogModal').modal();
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

        for (var i = 0; i < $scope.membertrips.length; i++)
        {
            if ($scope.membertrips[i].id == tripid)
            {
                $scope.current.trip = $scope.membertrips[i];

                $scope.current.tripname = $scope.membertrips[i].tripname;

                console.log($scope.current.trip);
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

            console.log(formstring);

            memberFactory.savememberTrip(formstring)
            .success( function(data) {
                if (data == "ok")
                {
                    $('#tripSetupMemberDialogModalTitle').text("Member Trip Update Success");
                    $('#tripSetupMemberDialogModalBody').html("Trip information updated succesfully for Trip <span style='color:teal;font-weight:700'>"+$scope.current.tripname+"</span>!");

                    $('#tripSetupMemberDialogModal').modal();
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

    function resetTripForm() {
        $("#membersetuptripForm")[0].reset();

        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
        $scope.current.email = $scope.current.memberlogin.email;
        $scope.current.trip = 0;
        $scope.current.tripname = "";
    }

    function getMemberTripWaypoints() {
        var qdata = 'memberid='+$scope.current.memberid+'&tripid='+$scope.current.tripid;
        memberFactory.getMembertripwaypoints(qdata)
            .success( function(data) {
                $scope.membertripwaypoints = data;

                console.log($scope.membertripwaypoints);
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberTripWaypoint(waypointid) {

        for (var i = 0; i < $scope.membertripwaypoints.length; i++)
        {
            if ($scope.membertripwaypoints[i].id == waypointid)
            {
                $scope.current.waypoint = $scope.membertripwaypoints[i];
                $scope.current.waypointname = $scope.membertripwaypoints[i].waypointname;

                console.log($scope.current.waypoint);
            }
        }
    }

    function resetTripWaypointForm() {
        $("#membersetuptripwaypointForm")[0].reset();

        $scope.current.waypoint ="";
    }

    function updateMemberTripWaypoint() {

        var formstring = $("#membersetuptripwaypointForm").serialize();
            // var formstringClean = encodeURIComponent(formstring);

            console.log(formstring);

            memberFactory.savememberTripWaypoint(formstring)
            .success( function(data) {
                if (data == "ok")
                {
                    $('#tripSetupMemberDialogModalTitle').text("Member Trip Waypoint Update Success");
                    $('#tripSetupMemberDialogModalBody').html("Trip Waypoint information updated succesfully for Waypoint <span style='color:teal;font-weight:700'>"+$scope.current.waypointname+"</span>!");
                    $('#tripSetupMemberDialogModal').modal();
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
        $scope.current.tripname = "";
        $scope.current.waypointid = "";
        $scope.current.waypointname = "";
        $scope.current.email = $scope.current.memberlogin.email;
        $scope.membertrips = "";

        getMemberTrips();
    };

    $scope.getMemberTrip = function (tripid) {
        getMemberTrip(tripid);

        getMemberTripWaypoints();
    }

    $scope.newTrip = function () {
        resetTripForm();
    }

    $scope.newTripWaypoint = function () {
        $scope.current.waypointid = "";

        resetTripWaypointForm();
    }

    $scope.updateMemberTrip = function () {
        updateMemberTrip();

        $scope.membertrips = "";
        getMemberTrips();
    }

    $scope.DeleteMemberTrip = function () {

    }

    $scope.getMemberTripWaypoint = function (tripid, waypointid) {
        getMemberTripWaypoint(waypointid);
    }
    
    $scope.updateMemberTripWaypoint = function () {
        updateMemberTripWaypoint();

        $scope.current.waypointid = "";

        resetTripWaypointForm();

        // resetTripWaypointForm();

        $scope.membertripwaypoints = "";
        getMemberTripWaypoints();
    }

  }
