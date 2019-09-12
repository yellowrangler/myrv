<?php
include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];

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
$modulecontent = "Unable to get member gas trip entry. memberid = $memberid. tripid = $activetripid.";
include 'mysqlconnect.php';

//---------------------------------------------------------------
// get gas trip entry
//---------------------------------------------------------------
$sql = "SELECT * FROM gastripentrytbl
WHERE tripid = $tripid AND memberid = $memberid";

// print $sql;

//
// sql query
//
$modulecontent = "Unable to get member gas trip entry. memberid = $memberid. tripid = $activetripid.";
$function = "select";
include 'mysqlquery.php';

// 
// Get the results
// 
$detailEntry = mysqli_fetch_assoc($sql_result);

if ( !is_null($detailEntry[date]) )
{
	$time = strtotime($detailEntry[date]);
	$detailEntry[date] = date("m/d/Y", $time);
}

if ( !is_null($detailEntry[time]) )
{
	$time = strtotime($detailEntry[time]);
	$detailEntry[time] = date("g:i A", $time);
}

//
// close db connection
//
mysqli_close($dbConn);

exit(json_encode($detailEntry));
?>
