<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;
$msgtext = "ok";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//
// db connect
//
$modulecontent = "Unable to get member trip capture gas totals information. memberid = $memberid. tripid = $tripid.";
include 'mysqlconnect.php';

$sql = "SELECT *
FROM gastriptotalstbl 
WHERE memberid = $memberid AND tripid = $tripid 
ORDER BY id DESC LIMIT 1";

//
// sql query
//
$function = "select";
include 'mysqlquery.php';

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$tripid = mysqli_insert_id($dbConn);
}

// 
// Now add initial gas trip totals
// 
$sql = "SELECT * 
FROM gastriptotalstbl 
WHERE memberid = $memberid AND tripid = $tripid 
ORDER BY id DESC LIMIT 1";

//
// sql query
//
$modulecontent = "Unable to get member trip gas total information. memberid = $memberid. tripid = $tripid.";
$function = 'select';
include 'mysqlquery.php';

// 
// Get the results
// 
$membertripgastotals = mysqli_fetch_assoc($sql_result);


//
// close db connection
//
mysqli_close($dbConn);

//
// pass back info
//
exit(json_encode($membertripgastotals));
?>
