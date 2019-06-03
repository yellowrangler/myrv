<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$exportType = "";
if (isset($_GET['exportType']))
{
    $exportType = $_GET['exportType'];
}

$memberid = 0;
if (isset($_GET['memberid']))
{
    $memberid = $_GET['memberid'];
}

$tripid = 0;
if (isset($_GET['tripid']))
{
    $tripid = $_GET['tripid'];
}

$exportfilename = "export.csv";
if (isset($_GET['exportfilename']))
{
    $exportfilename = $_GET['exportfilename'];
}


// print_r($_POST);
// exit();

// 
//  globals
// 
$headers = array();

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// set variables
$enterdate = $datetime;

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to export $exportdata. memberid = $memberid.";
include 'mysqlconnect.php';

switch ($exportType) {
    case 'trips':
        //---------------------------------------------------------------
        // get trip information
        //---------------------------------------------------------------
        $sql = "SELECT *, 
            (SELECT CONCAT_WS(' ',make, model, year, platenbr) as rvname  
            FROM vehicletbl V
            WHERE memberid = $memberid and V.id = T.rv) as rvname, 
            (SELECT CONCAT_WS(' ',make, model, year, platenbr) as towvehiclename  
            FROM vehicletbl V
            WHERE memberid = $memberid and V.id = T.towvehicle) as towvehiclename 
            FROM triptbl T
            WHERE memberid = $memberid";
        break;

    case 'gascapture':
        //---------------------------------------------------------------
        // get gas trip capture entries
        //---------------------------------------------------------------
        $sql = "SELECT * FROM gastripentrytbl
        WHERE tripid = $tripid AND memberid = $memberid";

        break;    
    
    default:
    alert("No export data sent");
        die();
        break;
}


// print $sql;

//
// sql query
//
$modulecontent = "Unable to export member trips. memberid = $memberid.";
$function = "select";
include 'mysqlquery.php';

// 
// Get the field number and build title row
// 
$num_fields = mysqli_num_fields($sql_result);
for ($i = 0; $i < $num_fields; $i++)
{
    $finfo = mysqli_fetch_field_direct($sql_result, $i);
    $headers[] = $finfo->name;
}

$fp = fopen('php://output', 'w');
if ($fp && $sql_result) {
	header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $exportfilename . '"');

    fputcsv($fp, $headers);
    while ($row = mysqli_fetch_array($sql_result,MYSQLI_NUM)) {
        fputcsv($fp, array_values($row));
    }
    fclose($fp);
    $contLength = ob_get_length();
    header( 'Content-Length: '.$contLength);
}
?>
