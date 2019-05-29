<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
// $memberid = $_POST['memberid'];
// $tripid = $_POST['tripid'];

$memberid = $_GET['memberid'];
$tripid = $_GET['tripid'];

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
$modulecontent = "Unable to export member gas trip entries. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas trip entries
//---------------------------------------------------------------
$sql = "SELECT * FROM gastripentrytbl
WHERE tripid = $tripid AND memberid = $memberid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to export member gas trip entries. memberid = $memberid. tripid = $tripid.";
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
    header('Content-Disposition: attachment; filename="export.csv"');

    fputcsv($fp, $headers);
    while ($row = mysqli_fetch_array($sql_result,MYSQLI_NUM)) {
        fputcsv($fp, array_values($row));
    }
    fclose($fp);
    $contLength = ob_get_length();
    header( 'Content-Length: '.$contLength);
}
?>
