myrvApp.service('exportService', function () {

    this.getExportUrl = function(parms) {
        var exportUrl = "";

        switch (parms.exportType) 
        {
            case 'gascapture':
                exportUrl = exportUrlBase+"exportdata.php?memberid="+parms.memberid+"&tripid="+parms.tripid+"&exportfilename="+parms.exportfilename+"&exportType="+parms.exportType;
                break;

            case 'trips':
                exportUrl = exportUrlBase+"exportdata.php?memberid="+parms.memberid+"&exportfilename="+parms.exportfilename+"&exportType="+parms.exportType;
                break;

           default:
                alert("Invalid export type = "+parms.exportType); 
                break;
        }

        return exportUrl;
    }

    var exportUrlBase = "app/ajax/";

 });