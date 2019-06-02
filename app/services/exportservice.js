myrvApp.service('exportService', function () {

    this.getExportUrl = function(parms) {
        var exportUrl = "";

        switch (parms.exportType) 
        {
            case 'gascapture':
                exportUrl = exportUrlBase+"exportgascapture.php?memberid="+parms.memberid+"&tripid="+parms.tripid;
                break;

            case 'trips':
                exportUrl = exportUrlBase+"exporttrips.php?memberid="+parms.memberid;
                break;

           default:
                alert("Invalid export type = "+parms.exportType); 
                break;
        }

        return exportUrl;
    }

    var exportUrlBase = "app/ajax/";

 });