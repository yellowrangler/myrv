<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];
$waypointid = $_POST['waypointid'];

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
$dbConn = @mysql_connect($DBhost, $DBuser, $DBpassword);
if (!$dbConn) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to delete member trip waypoint information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to delete member trip waypoint information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// delete the waypoint 
//---------------------------------------------------------------
$sql = "DELETE FROM tripwaypointstbl  
WHERE memberid = $memberid AND tripid = $tripid AND id = $waypointid";

	
// print $sql;
// exit();

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to delete member $memberid trip waypoint information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["waypointid"] = $waypointid;
$msg["waypointname"] = $waypointname;

exit(json_encode($msg));

?>
