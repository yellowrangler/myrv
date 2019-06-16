myrvApp.factory('memberFactory', function($q, $http) {
    var factory = {};

    factory.membermanageMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/membermanagemember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.savememberTrip = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembertrip.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deletememberTrip = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembertrip.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMemberTrips = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertrips.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMemberTrip = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertrip.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripgastotals = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripgastotals.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripgasdetails = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripgasdetails.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripeventdetails = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripeventdetails.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripfooddetails = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripfooddetails.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripovernightdetails = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripovernightdetails.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripfrienddetails = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripfrienddetails.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembertripgasdetail = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertripgasdetail.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMembergastripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembergastripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberovernighttripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberovernighttripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberfoodtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberfoodtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMembereventtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembereventtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberservicetripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberservicetripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberfriendtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberfriendtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.exportData = function (data) {
        return $http({ 
            method: 'GET', 
            url: "app/ajax/exportdata.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMembergastripentrytotals = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembergastripentrytotals.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMembergastripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembergastripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMembereventtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembereventtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberovernighttripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletememberovernighttripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberfoodtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletememberfoodtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberfriendtripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletememberfriendtripentry.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.capturegasRecalculate = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/capturegasrecalculate.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembervehicles = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembervehicles.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.savememberVehicle = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembervehicle.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberVehicle = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembervehicle.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembervehicleinsurances = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembervehicleinsurances.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMembervehicleinsurance = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembervehicleinsurance.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deletememberVehicleInsurance = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembervehicleinsurance.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembervehicleroadsideassitances = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembervehicleroadsideassitances.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembervehicleroadsideassitance = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembervehicleroadsideassitance.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMembervehicleroadsideassistance = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembervehicleroadsideassistance.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deletememberVehicleRoadsideAssistance = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembervehicleroadsidesssistance.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    
    factory.getMemberRVmemberships = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmemberrvmemberships.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMemberRVmembership = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmemberrvmembership.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberRVmembership = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberrvmembership.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberRVmembership = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletememberrvmembership.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getMemberProfileDialog = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmemberprofiledialog.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMembersAdmin = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmembersadmin.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMemberAdmin = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmemberadmin.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.addMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/addmember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.addMemberGroup = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/addmembergroup.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMemberGroups = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmembergroups.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getAllMemberGroup = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmembergroup.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.updateMemberGroup = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/updatemembergroup.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMemberGroup = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemembergroup.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }
    factory.getAllMemberGroupMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getallmembergroupmembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.buildeMailTemplate = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/buildemail.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.updateMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/updatemember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.deleteMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/deletemember.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.saveMemberAvatar = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savememberavatar.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.addMemberGameTeamPick = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/addmembergameteampick.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.sendeMail2Members = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/sendemail2members.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getLatePickMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getlatepickmembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getLatePickDayOfMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getlatepickdayofmembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getLatePickDayBeforeMembers = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getlatepickbeforemembers.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    return factory;
});