<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];

// print_r($_POST);
// exit();

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
$modulecontent = "Unable to get member dashboard snapshot data. memberid = $memberid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas trip entries
//---------------------------------------------------------------
$sql = "SELECT T.tripname, 
	GT.odometer, 
	GT.totalamount, 
	GT.avecostpergallon,
	COALESCE(CASE WHEN T.startodometer IS NOT NULL THEN (GT.odometer - T.startodometer) ELSE GT.totalmiles END,0) AS totalmiles,
	GT.avempg, 
	GT.totalgallons
FROM triptbl T
LEFT JOIN gastriptotalstbl GT ON GT.memberid = T.memberid AND GT.tripid = T.id 
WHERE T.currenttrip = 1 AND T.memberid = $memberid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to get member dashboard snapshot data. memberid = $memberid.";
$function = "select";
include 'mysqlquery.php';

// 
// Get the results
// 
$detailEntry = mysqli_fetch_assoc($sql_result);

//
// close db connection
//
mysqli_close($dbConn);

exit(json_encode($detailEntry));
?>
