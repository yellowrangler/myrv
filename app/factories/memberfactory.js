myrvApp.factory('memberFactory', function($q, $http) {
    var factory = {};

    factory.membersetupMember = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/membersetupmember.php",
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

    factory.getMembertrips = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getmembertrips.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    factory.getActiveMembertrip = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/getactivemembertrip.php",
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

    factory.saveMembergastripentry = function (data) {
        return $http({ 
            method: 'POST', 
            url: "app/ajax/savemembergastripentry.php",
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