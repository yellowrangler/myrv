myrvApp.service('exportService', function () {

    this.getExportUrl = function(parms) {
        var exportUrl = "";

        switch (parms.exportType) 
        {
            case 'gascapture':
                exportUrl = exportUrlBase+"exportgascapture.php?memberid="+parms.memberid+"&tripid="+parms.tripid;
                break;

           default:
                alert("Invalid export type = "+parms.exportType); 
                break;
        }

        return exportUrl;
    }

    var exportUrlBase = "app/ajax/";

 });