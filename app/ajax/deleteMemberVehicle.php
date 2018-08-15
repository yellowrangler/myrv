<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

$memberid = $_POST['memberid'];
$vehicleid = $_POST['vehicleid'];
$vehiclename = $_POST['vehiclename'];

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

//------------------------------------------------------
// get admin user info
//------------------------------------------------------
// open connection to host
$DBhost = "localhost";
$DBschema = "myrv";
$DBuser = "tarryc";
$DBpassword = "tarryc";

//
// connect to db
//

$mysqli = new mysqli($DBhost, $DBuser, $DBpassword, $DBschema);
if ($mysqli->connect_errno) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysqli_connect_error();
	$log->writeLog("DB error: $dberr - Error connect db Unable to delete member vehicle information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// delete the waypoint 
//---------------------------------------------------------------
$sql = "DELETE FROM vehicletbl  
WHERE memberid = $memberid AND vehicleid = $vehicleid";

// print $sql;
// exit();

$result = $mysqli->query($sql);
if (!$result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to delete member $memberid vehicle information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// close db connection
//
$mysqli->close();

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["vehicleid"] = $vehicleid;
$msg["vehiclename"] = $vehiclename;

exit(json_encode($msg));

?>