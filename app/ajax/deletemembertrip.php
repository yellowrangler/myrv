<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//

$tripid = $_POST['tripid'];
$memberid = $_POST['memberid'];
$tripname = $_POST['tripname'];

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
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to delete member trip information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to delete member trip information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// if current trip find if another exicts then change 
//---------------------------------------------------------------
if ($currenttrip == 1) {
	$sql = "UPDATE triptbl SET currenttrip = 0 WHERE memberid = $memberid";

	$sql_result = @mysql_query($sql, $dbConn);
	if (!$sql_result)
	{
	    $log = new ErrorLog("logs/");
	    $sqlerr = mysql_error();
	    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to delete all current trips for member: $memberid");
	    $log->writeLog("SQL: $sql");

	    $status = -100;
	    $msgtext = "System Error: $sqlerr";
	}

}

//---------------------------------------------------------------
// delete an existing trip. 
//---------------------------------------------------------------
$sql = "DELETE FROM triptbl 
WHERE memberid = $memberid AND id = $tripid";

// print $sql;
// exit();

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to delete member $memberid trip information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//---------------------------------------------------------------
// delete an existing trip waypoints. 
//---------------------------------------------------------------
$sql = "DELETE FROM tripwaypointstbl  
WHERE memberid = $memberid AND tripid = $tripid";

// print $sql;
// exit();

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to delete member $memberid trip information.");
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
$msg["tripid"] = $tripid;
$msg["tripname"] = $tripname;

exit(json_encode($msg));

?>
